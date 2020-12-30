import { useGlobal } from 'reactn'
import { useState, useEffect } from 'react'
import { getHarpStrata, getPropsForHarpStrata } from 'harpstrata'
import { DegreeIds } from 'harpparts'
import type { PitchIds } from 'harpparts'

import { activateHarpCell, getNextQuizQuestion } from '../../utils'
import { ExperienceModes } from '../../../../types'

enum QuizStates {
  Ask,
  Listen,
  Answer,
  Wait,
}

type FlushOverrides = [(arg0: boolean) => void, (arg0: boolean) => void]

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
      resetActiveHarpStrata()
      const finishAsking = setTimeout(() => {
        setQuizState(QuizStates.Listen)
      }, 1500)
      return () => clearTimeout(finishAsking)
    }
    // Clear the state flag for extending the Listen state
    // and transition to Answer state after a period.
    // Timeout is cancelled and reset after the state flag
    // for extension is set to true.
    // TODO: address or make explicit the fact that this
    // timeout value needs to be higher than the timeouts
    // being set in the toggle flushing, otherwise it will
    // be this timeout that flushes the buffer when it reveals
    // the answer
    if (quizState === QuizStates.Listen) {
      const finishListening = setTimeout(() => {
        setQuizState(QuizStates.Answer)
      }, 5000)
      return () => clearTimeout(finishListening)
    }
    // Add correct answer to the harpface and invisibly
    // set a new question in the background, then
    // transition back to Ask state after a period.
    // TODO: deal with the fact that this effect will be
    // entered multiple times more cell interactions occur
    // while the answer is being given, and that will lead
    // to the next question being displayed too
    if (quizState === QuizStates.Answer) {
      addCorrectAnswer()
      setQuizQuestion(getNextQuizQuestion(quizQuestion, activeDisplayMode))
      const onToNextQuestion = setTimeout(() => {
        setQuizState(QuizStates.Ask)
      }, 2000)
      return () => clearTimeout(onToNextQuestion)
    }
    return
  }, [quizState, bufferedActivityToggles])

  // Respond to activeHarpStrata updates
  useEffect(() => {
    if (quizState === QuizStates.Wait || quizState === QuizStates.Answer) return
    if (quizState === QuizStates.Listen) return setQuizState(QuizStates.Answer)
    if (quizState === QuizStates.Ask) return resetActiveHarpStrata()
    return
  }, [activeHarpStrata])

  // Updates to the bufferedActivityToggles should extend the
  // Listen state timeout *if* we're in Listen state.
  useEffect(() => {
    // This condition is important to prevent the toggle
    // buffer flush from driving an early Listen extension
    if (bufferedActivityToggles.length === 0) return
    if (
      quizState === QuizStates.Listen &&
      bufferedActivityToggles.every((degree) => degree === quizQuestion)
    )
      return
    if (quizState === QuizStates.Listen) return setShouldForceFlush(true)
    return
  }, [bufferedActivityToggles])

  const isDisplayPeriod = quizState === QuizStates.Ask
  const shouldDisplayQuestion =
    isScreenFree &&
    isDisplayPeriod &&
    activeExperienceMode === ExperienceModes.Quiz

  return [quizQuestion, shouldDisplayQuestion]
}
