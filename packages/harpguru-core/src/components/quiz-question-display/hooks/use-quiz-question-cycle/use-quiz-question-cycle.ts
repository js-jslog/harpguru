import { useGlobal, useDispatch } from 'reactn'
import { unstable_batchedUpdates } from 'react-native'
import { useState, useEffect } from 'react'
import { DegreeIds, isPitchId } from 'harpparts'
import type { PitchIds } from 'harpparts'

import { getNextQuizQuestion, hasToggledIncorrectCell } from '../../utils'
import { ExperienceModes, FlushChannels } from '../../../../types'
import { useFlushBufferedActivityToggles } from '../../../../hooks'

enum QuizStates {
  Ask,
  Listen,
  Answer,
  Wait,
}

export const useQuizQuestionCycle = (
  isScreenFree: boolean
): [DegreeIds | PitchIds, boolean] => {
  const [activeExperienceMode] = useGlobal('activeExperienceMode')
  const [activeHarpStrata] = useGlobal('activeHarpStrata')
  const [activeDisplayMode] = useGlobal('activeDisplayMode')
  const [bufferedActivityToggles] = useGlobal('bufferedActivityToggles')
  const [flushChannel, setFlushChannel] = useGlobal('flushChannel')
  const flushBufferedActivityToggles = useFlushBufferedActivityToggles()

  const [quizState, setQuizState] = useState<QuizStates>(QuizStates.Wait)
  const [quizQuestion, setQuizQuestion] = useState<DegreeIds | PitchIds>(
    getNextQuizQuestion(DegreeIds.Root, activeDisplayMode)
  )

  // This function is involved in a quirk which requires some
  // understanding. The reason that the returned value needs
  // to include not only the degrees which are active on the
  // activeHarpStrata but also the ones already in the toggle
  // buffer is that removing toggles from the buffer without
  // properly flushing them will result in isolated active
  // cells (cells highlighted without their siblings being
  // soon to be highlighted too). We *must* continue with
  // the flushing of the buffered cells.
  //
  // The above scenario most commonly happens after the answer
  // has been given and before the next question is asked and
  // a cell is toggled. We *could* flush that toggle and only
  // then buffer the clearing toggles, then flush those, but
  // we need to force multiple renders for that to complete
  // successfully, otherwise the highlighted cell will just
  // receive the same 'inactive' props it already had and the
  // memo will leave it unrendered. Forcing multiple renders
  // feels janky, so the alternative is to deal with one render
  // during the transition back to ask, and another render
  // during the transition to ListenTimeout. That's why you'll
  // see another call to the clear function there. The user
  // doesn't have a chance to buffer another toggle during
  // that period in the current design because there is a
  // press-blocking flash notification, so the next clear
  // function will be guaranteed to clear the cells flushed
  // during the Ask state if relevant.
  const bufferClearingToggles = useDispatch((global) => {
    const { activeHarpStrata, bufferedActivityToggles } = global
    if (activeHarpStrata.activeDegreeIds.length === 0) return
    return {
      bufferedActivityToggles: [
        ...bufferedActivityToggles,
        ...activeHarpStrata.activeDegreeIds,
      ],
    }
  })

  const resetHarpFace = () => {
    bufferClearingToggles()
    flushBufferedActivityToggles()
  }

  const bufferCorrectAnswer = useDispatch(
    (bufferedActivityToggles: ReadonlyArray<DegreeIds>) => {
      // TODO: need to make this work with pitch questions too
      if (isPitchId(quizQuestion))
        throw new Error('Cant handle giving pitch answers yet')
      return [...bufferedActivityToggles, quizQuestion]
    },
    'bufferedActivityToggles'
  )

  const batchAnswerActions = () => {
    unstable_batchedUpdates(() => {
      bufferCorrectAnswer()
      flushBufferedActivityToggles()
      setQuizQuestion(getNextQuizQuestion(quizQuestion, activeDisplayMode))
    })
  }

  // Start asking questions when the experience mode is set to Quiz
  // and the screen is clear of menus
  useEffect(() => {
    if (!isScreenFree) return setQuizState(QuizStates.Wait)
    if (activeExperienceMode === ExperienceModes.Quiz) {
      setFlushChannel(FlushChannels.Quiz)
      setQuizQuestion(getNextQuizQuestion(quizQuestion, activeDisplayMode))
      return setQuizState(QuizStates.Ask)
    }
    if (activeExperienceMode === ExperienceModes.Explore) {
      setFlushChannel(FlushChannels.Regular)
      return setQuizState(QuizStates.Wait)
    }
  }, [activeExperienceMode, isScreenFree])

  // Time based transitions between states
  // and the associated harpface updates
  useEffect(() => {
    if (flushChannel !== FlushChannels.Quiz) return
    // Clear the harpface of active cells &
    // transition to Listen after a period
    if (quizState === QuizStates.Ask) {
      resetHarpFace()
      const finishAsking = setTimeout(() => {
        setQuizState(QuizStates.Listen)
      }, 1500)
      return () => clearTimeout(finishAsking)
    }

    // Add correct answer to the buffer and flush this
    // along with anything else found there and then
    // set a new question in the background, then
    // transition back to Ask state after a period.
    if (quizState === QuizStates.Answer) {
      batchAnswerActions()
      const onToNextQuestion = setTimeout(() => {
        setQuizState(QuizStates.Ask)
      }, 2000)
      return () => clearTimeout(onToNextQuestion)
    }
    return
  }, [quizState, flushChannel])

  // Effect to handle the logic while in Listen state.
  // The Listen state is the only one for which it's
  // operations depend on how the user is interacting
  // with the `bufferedActivityToggles`. Hense it's the
  // only one with actions dependent on this property.
  useEffect(() => {
    if (flushChannel !== FlushChannels.Quiz) return
    if (quizState !== QuizStates.Listen) return

    // If we've *just* entered Listen state
    if (bufferedActivityToggles.length === 0) {
      resetHarpFace()
      const finishListening = setTimeout(() => {
        setQuizState(QuizStates.Answer)
      }, 5000)
      return () => clearTimeout(finishListening)
    }

    // Else if we've started answering then prepare to transition
    // to the Answer state conditional on whether we've been
    // answering correctly or not.
    const transitionToAnswerState = () => {
      setQuizState(
        (quizState: QuizStates): QuizStates => {
          if (quizState === QuizStates.Listen) return QuizStates.Answer
          return quizState
        }
      )
    }
    const toggleEvalProps = {
      toggleBuffer: bufferedActivityToggles,
      quizQuestion,
      harpKeyId: activeHarpStrata.harpKeyId,
      pozitionId: activeHarpStrata.pozitionId,
    }
    const answerImmediately = hasToggledIncorrectCell(toggleEvalProps)
    if (answerImmediately) return transitionToAnswerState()
    const timeout = setTimeout(() => {
      transitionToAnswerState()
    }, 3000)
    return () => clearTimeout(timeout)
  }, [bufferedActivityToggles, activeHarpStrata, quizState, flushChannel])

  const isDisplayPeriod = quizState === QuizStates.Ask
  const shouldDisplayQuestion =
    isScreenFree &&
    isDisplayPeriod &&
    activeExperienceMode === ExperienceModes.Quiz

  return [quizQuestion, shouldDisplayQuestion]
}
