import { useGlobal } from 'reactn'
import { useTimingTransition } from 'react-native-redash'
import { Easing } from 'react-native-reanimated'
import type { Node } from 'react-native-reanimated'
import { useState, useEffect } from 'react'
import { DegreeIds, getHarpStrata } from 'harpstrata'
import type { PitchIds } from 'harpstrata'

import { activateHarpCell } from '../../../../utils/set-global-reducers/utils'
import { getNextQuizQuestion } from '../../../../utils/get-next-quiz-question'
import { getPropsForHarpStrata } from '../../../../utils'
import { ExperienceModes, DisplayModes } from '../../../../types'

enum QuizStates {
  Ask,
  Listen,
  Answer,
  Wait,
}

export const useQuizQuestionCycle = (
  screenFree: boolean
): [DegreeIds | PitchIds, Node<number>] => {
  const [quizState, setQuizState] = useState<QuizStates>(QuizStates.Wait)
  const [quizQuestion, setQuizQuestion] = useState<DegreeIds | PitchIds>(
    DegreeIds.Root
  )
  const [shouldExtendListen, setShouldExtendListen] = useState(false)
  const [activeExperienceMode] = useGlobal('activeExperienceMode')
  const [activeHarpStrata, setActiveHarpStrata] = useGlobal('activeHarpStrata')
  const [activeDisplayMode] = useGlobal('activeDisplayMode')
  const [bufferedActivityToggles] = useGlobal(
    'bufferedActivityToggles'
  )

  const resetActiveHarpStrata = () => {
    if (activeHarpStrata.isActiveComplex.activeDegreeIds.length === 0) return
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
  useEffect(() => {
    if (!screenFree) return setQuizState(QuizStates.Wait)
    if (activeExperienceMode === ExperienceModes.Quiz)
      return setQuizState(QuizStates.Ask)
    if (activeExperienceMode === ExperienceModes.Explore)
      return setQuizState(QuizStates.Wait)
  }, [activeExperienceMode, screenFree])

  useEffect(() => {
    // Move from asking to listening for answers after 1 second
    if (quizState === QuizStates.Ask) {
      resetActiveHarpStrata()
      const finishAsking = setTimeout(() => {
        setQuizState(QuizStates.Listen)
      }, 1500)
      return () => clearTimeout(finishAsking)
    }
    if (quizState === QuizStates.Listen || shouldExtendListen) {
      setShouldExtendListen(false)
      const finishListening = setTimeout(() => {
        setQuizState(QuizStates.Answer)
      }, 5000)
      return () => clearTimeout(finishListening)
    }
    if (quizState === QuizStates.Answer) {
      addCorrectAnswer()
      setQuizQuestion(getNextQuizQuestion(quizQuestion, activeDisplayMode))
      const onToNextQuestion = setTimeout(() => {
        setQuizState(QuizStates.Ask)
      }, 2000)
      return () => clearTimeout(onToNextQuestion)
    }
    return setShouldExtendListen(false)
  }, [quizState, shouldExtendListen])

  // In answer state, the harpstrata should be updated to include the
  // correct answer, and any further modifications to the harpstrata
  // while this is happening should be overwritten
  useEffect(() => {
    if (quizState === QuizStates.Wait || quizState === QuizStates.Answer) return
    if (quizState === QuizStates.Listen) return setQuizState(QuizStates.Answer)
    if (quizState === QuizStates.Ask) return resetActiveHarpStrata()
    return
  }, [activeHarpStrata])

  // Updates to the bufferedActivityToggles should extend the
  // listen state timeout if it's in listen state.
  useEffect(() => {
    if (bufferedActivityToggles.length === 0) return
    if (quizState === QuizStates.Listen) return setShouldExtendListen(true)
    return
  }, [bufferedActivityToggles])

  const isDisplayPeriod = quizState === QuizStates.Ask
  const shouldDisplayQuestion =
    screenFree &&
    isDisplayPeriod &&
    activeExperienceMode === ExperienceModes.Quiz

  const flashAnimationValue = useTimingTransition(shouldDisplayQuestion, {
    duration: 200,
    easing: Easing.inOut(Easing.ease),
  })

  return [quizQuestion, flashAnimationValue]
}
