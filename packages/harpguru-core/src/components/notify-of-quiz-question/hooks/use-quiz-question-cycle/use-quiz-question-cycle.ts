import { useGlobal, useDispatch } from 'reactn'
import { useState, useEffect } from 'react'
import { getHarpStrata } from 'harpstrata'
import { DegreeIds, isPitchId } from 'harpparts'
import type { PitchIds } from 'harpparts'

import {
  getNextQuizQuestion,
  hasToggledIncorrectCell,
  getCounterpartDegreeId,
  reduceForNewHarpStrataByHardReset,
} from '../../utils'
import { ExperienceModes, FlushChannels } from '../../../../types'
import { useFlushBufferedActivityToggles } from '../../../../hooks'

// Ask - display the question
// Listen - allow user to input answers
// Answer - show the correct answers
// Wait - Be inactive whilst not in quiz mode or menus are open
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
  const [activeDisplayMode] = useGlobal('activeDisplayMode')
  const [bufferedActivityToggles] = useGlobal('bufferedActivityToggles')
  const [flushChannel, setFlushChannel] = useGlobal('flushChannel')
  const [activeQuizDegrees] = useGlobal('activeQuizDegrees')
  const [harpKeyId] = useGlobal('harpKeyId')
  const [pozitionId] = useGlobal('pozitionId')

  const [quizState, setQuizState] = useState<QuizStates>(QuizStates.Wait)
  const [quizQuestion, setQuizQuestion] = useState<DegreeIds | PitchIds>(
    getNextQuizQuestion(DegreeIds.Root, activeQuizDegrees, activeDisplayMode)
  )

  const flushBufferedActivityToggles = useFlushBufferedActivityToggles()
  const hardResetHarpStrata = useDispatch(
    reduceForNewHarpStrataByHardReset,
    'activeHarpStrata'
  )

  const batchAnswerActions = useDispatch((activeHarpStrata) => {
    const {
      apparatus: { tuningId, valvingId },
      harpKeyId,
      pozitionId,
    } = activeHarpStrata
    const answerDegreeIds = (() => {
      if (isPitchId(quizQuestion)) {
        const counterpartDegreeId = getCounterpartDegreeId({
          pitchId: quizQuestion,
          harpKeyId: harpKeyId,
          pozitionId: pozitionId,
        })
        const answerDegreeIds = [
          ...bufferedActivityToggles,
          counterpartDegreeId,
        ]
        return answerDegreeIds
      }
      const answerDegreeIds = [...bufferedActivityToggles, quizQuestion]
      return answerDegreeIds
    })()
    const harpStrataProps = {
      tuningId,
      valvingId,
      harpKeyId,
      pozitionId,
      activeIds: answerDegreeIds,
    }
    const answerHarpStrata = getHarpStrata(harpStrataProps)
    return answerHarpStrata
  }, 'activeHarpStrata')

  // Start asking questions when the experience mode is set to Quiz
  // and the screen is clear of menus
  useEffect(() => {
    if (!isScreenFree) return setQuizState(QuizStates.Wait)
    if (activeExperienceMode === ExperienceModes.Quiz) {
      setFlushChannel(FlushChannels.Quiz)
      setQuizQuestion(
        getNextQuizQuestion(quizQuestion, activeQuizDegrees, activeDisplayMode)
      )
      return setQuizState(QuizStates.Ask)
    }
    if (activeExperienceMode === ExperienceModes.Explore) {
      setFlushChannel(FlushChannels.Regular)
      return setQuizState(QuizStates.Wait)
    }
  }, [activeExperienceMode, isScreenFree])

  // Non-interactive state transitions
  useEffect(() => {
    if (flushChannel !== FlushChannels.Quiz) return

    if (quizState === QuizStates.Ask) {
      flushBufferedActivityToggles()
      const finishAsking = setTimeout(() => {
        setQuizState(QuizStates.Listen)
      }, 1500)
      return () => clearTimeout(finishAsking)
    }

    if (quizState === QuizStates.Answer) {
      batchAnswerActions()
      setQuizQuestion(
        getNextQuizQuestion(quizQuestion, activeQuizDegrees, activeDisplayMode)
      )
      const onToNextQuestion = setTimeout(() => {
        setQuizState(QuizStates.Ask)
      }, 2000)
      return () => clearTimeout(onToNextQuestion)
    }
    return
  }, [quizState, flushChannel])

  // Interactive state transitions.
  // ie: just the Listen state
  //  - transitions out to Answer state
  //  - restarting the clock for state timeout if answer is correct
  useEffect(() => {
    if (flushChannel !== FlushChannels.Quiz) return
    if (quizState !== QuizStates.Listen) return

    // If we've *just* entered Listen state
    if (bufferedActivityToggles.length === 0) {
      hardResetHarpStrata()
      const finishListening = setTimeout(() => {
        setQuizState(QuizStates.Answer)
      }, 5000)
      return () => clearTimeout(finishListening)
    }

    const toggleEvalProps = {
      toggleBuffer: bufferedActivityToggles,
      quizQuestion,
      harpKeyId: harpKeyId,
      pozitionId: pozitionId,
    }
    const answerImmediately = hasToggledIncorrectCell(toggleEvalProps)
    if (answerImmediately) return setQuizState(QuizStates.Answer)
    const timeout = setTimeout(() => {
      setQuizState(QuizStates.Answer)
    }, 3000)
    return () => clearTimeout(timeout)
  }, [bufferedActivityToggles, harpKeyId, pozitionId, quizState, flushChannel])

  const isDisplayPeriod = quizState === QuizStates.Ask
  const shouldDisplayQuestion =
    isScreenFree &&
    isDisplayPeriod &&
    activeExperienceMode === ExperienceModes.Quiz

  return [quizQuestion, shouldDisplayQuestion]
}
