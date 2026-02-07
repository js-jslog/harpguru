import { useState, useEffect, useCallback } from 'react'
import { DegreeIds } from 'harpparts'
import type { PitchIds } from 'harpparts'

import {
  getNextQuizQuestion,
  hasToggledIncorrectCell,
  reduceEmptyActiveIdsToHarpStrata,
  reduceQuizAnswerToHarpStrata,
} from '../../utils'
import { reduceCellToggleBufferToHarpStrata } from '../../../../utils'
import { ExperienceModes, FlushChannels } from '../../../../types'
import { useHarpGuruStore, useHarpGuruStoreInstance } from '../../../../store'

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
  const activeExperienceMode = useHarpGuruStore(
    (state) => state.activeExperienceMode
  )
  const activeDisplayMode = useHarpGuruStore(
    (state) => state.activeDisplayMode
  )
  const cellToggleBuffer = useHarpGuruStore(
    (state) => state.bufferedActivityToggles
  )
  const flushChannel = useHarpGuruStore((state) => state.flushChannel)
  const setFlushChannel = useHarpGuruStore((state) => state.setFlushChannel)
  const activeQuizDegrees = useHarpGuruStore(
    (state) => state.activeQuizDegrees
  )
  const harpKeyId = useHarpGuruStore((state) => state.harpKeyId)
  const pozitionId = useHarpGuruStore((state) => state.pozitionId)

  const [quizState, setQuizState] = useState<QuizStates>(QuizStates.Wait)
  const [quizQuestion, setQuizQuestion] = useState<DegreeIds | PitchIds>(
    getNextQuizQuestion(DegreeIds.Root, activeQuizDegrees, activeDisplayMode)
  )

  const store = useHarpGuruStoreInstance()
  const flushBufferedActivityToggles = useCallback(() => {
    store.setState((state) => ({
      activeHarpStrata: reduceCellToggleBufferToHarpStrata(
        state.activeHarpStrata,
        cellToggleBuffer
      ),
    }))
  }, [store, cellToggleBuffer])
  const hardResetHarpStrata = useCallback(() => {
    store.setState((state) => ({
      activeHarpStrata: reduceEmptyActiveIdsToHarpStrata(
        state.activeHarpStrata
      ),
    }))
  }, [store])
  const addAnswerToHarpStrata = useCallback(() => {
    store.setState((state) => ({
      activeHarpStrata: reduceQuizAnswerToHarpStrata(
        state.activeHarpStrata,
        quizQuestion,
        cellToggleBuffer
      ),
    }))
  }, [store, quizQuestion, cellToggleBuffer])

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
      addAnswerToHarpStrata()
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
    if (cellToggleBuffer.length === 0) {
      hardResetHarpStrata()
      const finishListening = setTimeout(() => {
        setQuizState(QuizStates.Answer)
      }, 5000)
      return () => clearTimeout(finishListening)
    }

    const toggleEvalProps = {
      toggleBuffer: cellToggleBuffer,
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
  }, [cellToggleBuffer, harpKeyId, pozitionId, quizState, flushChannel])

  const isDisplayPeriod = quizState === QuizStates.Ask
  const shouldDisplayQuestion =
    isScreenFree &&
    isDisplayPeriod &&
    activeExperienceMode === ExperienceModes.Quiz

  return [quizQuestion, shouldDisplayQuestion]
}
