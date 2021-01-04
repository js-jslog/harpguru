import { useGlobal, useDispatch } from 'reactn'
import { unstable_batchedUpdates } from 'react-native'
import { useState, useEffect } from 'react'
import { getHarpStrata, getPropsForHarpStrata } from 'harpstrata'
import type { HarpStrata } from 'harpstrata'
import { DegreeIds, isPitchId } from 'harpparts'
import type { PitchIds } from 'harpparts'

import { getNextQuizQuestion, hasToggledIncorrectCell } from '../../utils'
import { ExperienceModes } from '../../../../types'
import { useFlushBufferedActivityToggles } from '../../../../hooks'

enum QuizStates {
  Ask,
  ListenTimeout,
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
  const [isOverridden, setIsOverridden] = useGlobal('isOverridden')
  const flushBufferedActivityToggles = useFlushBufferedActivityToggles()

  const [quizState, setQuizState] = useState<QuizStates>(QuizStates.Wait)
  const [quizQuestion, setQuizQuestion] = useState<DegreeIds | PitchIds>(
    getNextQuizQuestion(DegreeIds.Root, activeDisplayMode)
  )

  const clearHarpFace = useDispatch((activeHarpStrata): HarpStrata => {
    if (activeHarpStrata.activeDegreeIds.length === 0) activeHarpStrata
    const harpStrataProps = getPropsForHarpStrata(activeHarpStrata, 'DEGREE')
    return getHarpStrata({
      ...harpStrataProps,
      activeIds: [],
    })
  }, 'activeHarpStrata')

  const bufferCorrectAnswer = (
    bufferedActivityToggles: ReadonlyArray<DegreeIds>
  ): ReadonlyArray<DegreeIds> => {
    // TODO: need to make this work with pitch questions too
    if (isPitchId(quizQuestion))
      throw new Error('Cant handle giving pitch answers yet')
    return [...bufferedActivityToggles, quizQuestion]
  }

  const batchAnswerActions = () => {
    unstable_batchedUpdates(() => {
      flushBufferedActivityToggles(bufferCorrectAnswer(bufferedActivityToggles))
      setQuizQuestion(getNextQuizQuestion(quizQuestion, activeDisplayMode))
    })
  }

  // TODO: consider replacing this with subsequent
  // calls to flushBufferedActivityToggles but with
  // the relevant toggles to deactivate everything.
  const batchReset = () => {
    unstable_batchedUpdates(() => {
      flushBufferedActivityToggles(bufferedActivityToggles)
      clearHarpFace()
    })
  }

  // Start asking questions when the experience mode is set to Quiz
  // and the screen is clear of menus
  useEffect(() => {
    if (!isScreenFree) return setQuizState(QuizStates.Wait)
    if (activeExperienceMode === ExperienceModes.Quiz) {
      setIsOverridden(true)
      setQuizQuestion(getNextQuizQuestion(quizQuestion, activeDisplayMode))
      return setQuizState(QuizStates.Ask)
    }
    if (activeExperienceMode === ExperienceModes.Explore) {
      setIsOverridden(false)
      return setQuizState(QuizStates.Wait)
    }
  }, [activeExperienceMode, isScreenFree])

  // Time based transitions between states
  // and the associated harpface updates
  useEffect(() => {
    if (!isOverridden) return
    // Clear the harpface of active cells &
    // transition to Listen after a period
    if (quizState === QuizStates.Ask) {
      batchReset()
      const finishAsking = setTimeout(() => {
        setQuizState(QuizStates.ListenTimeout)
      }, 1500)
      return () => clearTimeout(finishAsking)
    }

    // TODO: this might not be necessary if I just
    // add the correct conditions to the buffer
    // driven useEffect, now that it also has
    // quizState driving it.
    if (quizState === QuizStates.ListenTimeout) {
      batchReset()
      const finishListening = setTimeout(() => {
        setQuizState(QuizStates.Answer)
      }, 5000)
      return () => clearTimeout(finishListening)
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
  }, [quizState, isOverridden])

  useEffect(() => {
    // This condition is important to prevent the buffer clear
    // that happens after flushing to cause an infinite loop here.
    if (!isOverridden) return
    if (bufferedActivityToggles.length === 0) return

    if (quizState === QuizStates.ListenTimeout)
      return setQuizState(QuizStates.Listen)

    const transitionToAnswerState = () => {
      setQuizState(
        (quizState: QuizStates): QuizStates => {
          if (
            quizState === QuizStates.ListenTimeout ||
            quizState === QuizStates.Listen
          )
            return QuizStates.Answer
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
  }, [bufferedActivityToggles, activeHarpStrata, quizState, isOverridden])

  const isDisplayPeriod = quizState === QuizStates.Ask
  const shouldDisplayQuestion =
    isScreenFree &&
    isDisplayPeriod &&
    activeExperienceMode === ExperienceModes.Quiz

  return [quizQuestion, shouldDisplayQuestion]
}
