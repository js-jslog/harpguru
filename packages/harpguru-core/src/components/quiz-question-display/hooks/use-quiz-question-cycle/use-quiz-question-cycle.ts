import { useGlobal } from 'reactn'
import { useTimingTransition } from 'react-native-redash'
import { Easing } from 'react-native-reanimated'
import type { Node } from 'react-native-reanimated'
import { useState, useEffect } from 'react'
import { DegreeIds, getHarpStrata } from 'harpstrata'
import type { PitchIds } from 'harpstrata'

import { activateHarpCell, getNextQuizQuestion } from '../../utils'
import { getPropsForHarpStrata } from '../../../../utils'
import { ExperienceModes, DisplayModes } from '../../../../types'

enum QuizStates {
  Ask,
  Listen,
  Answer,
  Wait,
}

export const useQuizQuestionCycle = (
  isScreenFree: boolean
): [DegreeIds | PitchIds, Node<number>] => {
  const [activeExperienceMode] = useGlobal('activeExperienceMode')
  const [activeHarpStrata, setActiveHarpStrata] = useGlobal('activeHarpStrata')
  const [activeDisplayMode] = useGlobal('activeDisplayMode')
  const [bufferedActivityToggles] = useGlobal('bufferedActivityToggles')

  const [quizState, setQuizState] = useState<QuizStates>(QuizStates.Wait)
  const [shouldExtendListen, setShouldExtendListen] = useState(false)
  const [quizQuestion, setQuizQuestion] = useState<DegreeIds | PitchIds>(
    getNextQuizQuestion(DegreeIds.Root, activeDisplayMode)
  )

  const resetActiveHarpStrata = () => {
    if (activeHarpStrata.activeDegreeIds.length === 0) return
    const harpStrataProps = getPropsForHarpStrata(
      activeHarpStrata,
      DisplayModes.Degree
    )
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
      setQuizQuestion(getNextQuizQuestion(quizQuestion, activeDisplayMode))
      return setQuizState(QuizStates.Ask)
    }
    if (activeExperienceMode === ExperienceModes.Explore)
      return setQuizState(QuizStates.Wait)
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
    if (quizState === QuizStates.Listen || shouldExtendListen) {
      setShouldExtendListen(false)
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
        setQuizState(QuizStates.Ask)
      }, 2000)
      return () => clearTimeout(onToNextQuestion)
    }
    // If we get this far without having returned
    // it's worth making sure that this state flag
    // for Listen extension is set to false. It
    // should only be true for the render immediately
    // following a toggle buffer update.
    return setShouldExtendListen(false)
  }, [quizState, shouldExtendListen])

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
    if (quizState === QuizStates.Listen) return setShouldExtendListen(true)
    return
  }, [bufferedActivityToggles])

  const isDisplayPeriod = quizState === QuizStates.Ask
  const shouldDisplayQuestion =
    isScreenFree &&
    isDisplayPeriod &&
    activeExperienceMode === ExperienceModes.Quiz

  const flashAnimationValue = useTimingTransition(shouldDisplayQuestion, {
    duration: 200,
    easing: Easing.inOut(Easing.ease),
  })

  return [quizQuestion, flashAnimationValue]
}
