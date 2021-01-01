import { useGlobal } from 'reactn'
import { useState, useEffect } from 'react'
import { getHarpStrata, getPropsForHarpStrata } from 'harpstrata'
import { DegreeIds } from 'harpparts'
import type { PitchIds } from 'harpparts'

import {
  activateHarpCell,
  getNextQuizQuestion,
  hasToggledIncorrectCell,
} from '../../utils'
import { ExperienceModes } from '../../../../types'

enum QuizStates {
  Ask,
  ListenTimeout,
  Listen,
  Answer,
  Wait,
}

type FlushOverrides = [(arg0: boolean) => void, (arg0: false | number) => void]

export const useQuizQuestionCycle = (
  isScreenFree: boolean,
  flushOverrides: FlushOverrides
): [DegreeIds | PitchIds, boolean] => {
  const [activeExperienceMode] = useGlobal('activeExperienceMode')
  const [activeHarpStrata, setActiveHarpStrata] = useGlobal('activeHarpStrata')
  const [activeDisplayMode] = useGlobal('activeDisplayMode')
  const [bufferedActivityToggles] = useGlobal('bufferedActivityToggles')
  const [setIsOverridden, setShouldForceFlush] = flushOverrides

  const [quizState, setQuizState] = useState<QuizStates>(QuizStates.Wait)
  const [quizQuestion, setQuizQuestion] = useState<DegreeIds | PitchIds>(
    getNextQuizQuestion(DegreeIds.Root, activeDisplayMode)
  )

  const resetActiveHarpStrata = () => {
    if (activeHarpStrata.activeDegreeIds.length === 0) return
    const harpStrataProps = getPropsForHarpStrata(activeHarpStrata, 'DEGREE')
    setActiveHarpStrata(
      getHarpStrata({
        ...harpStrataProps,
        activeIds: [],
      })
    )
  }

  const addCorrectAnswer = () => {
    const newHarpStrata = activateHarpCell(activeHarpStrata, quizQuestion)
    setActiveHarpStrata(newHarpStrata)
  }

  const flushAfterCorrectAnswerTimeout = () => {
    const timeout = setTimeout(() => {
      setShouldForceFlush(0)
    }, 3000)
    return () => clearTimeout(timeout)
  }

  const flushAfterIncorrectAnswerTimeout = () => {
    const timeout = setTimeout(() => {
      setShouldForceFlush(0)
    }, 500)
    return () => clearTimeout(timeout)
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
    // Clear the harpface of active cells &
    // transition to Listen after a period
    if (quizState === QuizStates.Ask) {
      const finishAsking = setTimeout(() => {
        setQuizState(QuizStates.ListenTimeout)
      }, 1500)
      return () => clearTimeout(finishAsking)
    }
    // Clear the state flag for extending the Listen state
    // and transition to Answer state after a period.
    // Timeout is cancelled and reset after the state flag
    // for extension is set to true.
    if (quizState === QuizStates.ListenTimeout) {
      const finishListening = setTimeout(() => {
        setQuizState(QuizStates.Answer)
      }, 5000)
      return () => clearTimeout(finishListening)
    }
    // Add correct answer to the harpface and invisibly
    // set a new question in the background, then
    // transition back to Ask state after a period.
    if (quizState === QuizStates.Answer) {
      addCorrectAnswer()
      setQuizQuestion(getNextQuizQuestion(quizQuestion, activeDisplayMode))
      const onToNextQuestion = setTimeout(() => {
        resetActiveHarpStrata()
        setQuizState(QuizStates.Ask)
      }, 2000)
      return () => clearTimeout(onToNextQuestion)
    }
    return
  }, [quizState])

  // Often, the activeHarpStrata will only have been updated because
  // of the need to flush the toggle buffer and update the harpface
  // in preparation for clearing it down again. The exceptions to
  // this are when the toggle buffer has been flushed from one of the
  // listening states where we are using this as a cue to move to the
  // Answer state, or when we are actually already in the Answer state
  // or the Wait state where we want to do nothing.
  useEffect(() => {
    const ignoreStates = [QuizStates.Answer, QuizStates.Wait]
    if (ignoreStates.includes(quizState)) return
    const listeningStates = [QuizStates.ListenTimeout, QuizStates.Listen]
    if (!listeningStates.includes(quizState)) return resetActiveHarpStrata()
    return setQuizState(QuizStates.Answer)
  }, [activeHarpStrata])

  // Updates to the bufferedActivityToggles should always flush
  // immediately so that the harpstrata can be reset to blank,
  // unless we're in a listening state where the user is actually
  // supposed to be interacting with the harp face.
  useEffect(() => {
    // This condition is important to prevent the buffer clear
    // that happens after flushing to cause an infinite loop.
    if (bufferedActivityToggles.length === 0) return

    const listeningStates = [QuizStates.ListenTimeout, QuizStates.Listen]
    if (!listeningStates.includes(quizState)) return setShouldForceFlush(0)

    // If it's already `Listen` then this will cause no
    // effect in the `quizState` driven effect so it's
    // safe to blindly reassign it here.
    setQuizState(QuizStates.Listen)

    const toggleEvalProps = {
      toggleBuffer: bufferedActivityToggles,
      quizQuestion,
      harpKeyId: activeHarpStrata.harpKeyId,
      pozitionId: activeHarpStrata.pozitionId,
    }
    if (hasToggledIncorrectCell(toggleEvalProps))
      return flushAfterIncorrectAnswerTimeout()
    return flushAfterCorrectAnswerTimeout()
  }, [bufferedActivityToggles])

  const isDisplayPeriod = quizState === QuizStates.Ask
  const shouldDisplayQuestion =
    isScreenFree &&
    isDisplayPeriod &&
    activeExperienceMode === ExperienceModes.Quiz

  return [quizQuestion, shouldDisplayQuestion]
}
