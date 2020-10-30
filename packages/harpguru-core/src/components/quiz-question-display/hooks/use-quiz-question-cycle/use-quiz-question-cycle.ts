import { useGlobal } from 'reactn'
import { useTimingTransition } from 'react-native-redash'
import { Easing } from 'react-native-reanimated'
import type { Node } from 'react-native-reanimated'
import {useState, useEffect} from 'react'
import { DegreeIds, getHarpStrata } from 'harpstrata'
import type { PitchIds } from 'harpstrata'

import { getNextQuizQuestion } from '../../../../utils/get-next-quiz-question'
import { getPropsForHarpStrata } from '../../../../utils'
import { ExperienceModes, DisplayModes } from '../../../../types'

enum QuizStates {
  Ask,
  Listen,
  Answer,
  Wait,
}

export const useQuizQuestionCycle = (screenFree: boolean): [DegreeIds | PitchIds, Node<number>] => {
  const [quizState, setQuizState] = useState<QuizStates>(QuizStates.Wait)
  const [quizQuestion, setQuizQuestion] = useState<DegreeIds | PitchIds>(DegreeIds.Root)
  const [activeExperienceMode] = useGlobal('activeExperienceMode')
  const [activeHarpStrata, setActiveHarpStrata] = useGlobal('activeHarpStrata')
  const [activeDisplayMode] = useGlobal('activeDisplayMode')

  // Start asking questions when the experience mode is set to Quiz
  useEffect(() => {
    if (activeExperienceMode === ExperienceModes.Quiz) return setQuizState(QuizStates.Ask)
    if (activeExperienceMode === ExperienceModes.Explore) return setQuizState(QuizStates.Wait)
  }, [activeExperienceMode])

  // Move from asking to listening for answers after 1 second
  useEffect(() => {
    if (quizState !== QuizStates.Ask) return
    const finishAsking = setTimeout(() => {
      setQuizState(QuizStates.Listen)
    }, 1000)
    return () => clearTimeout(finishAsking)
  }, [quizState])

  // Give the user 5 seconds to respond before moving to giving answers
  useEffect(() => {
    if (quizState !== QuizStates.Listen) return
    const timeoutListenPhase = setTimeout(() => {
      setQuizState(QuizStates.Answer)
    }, 5000)
    return () => clearTimeout(timeoutListenPhase)
  }, [quizState])

  // Immediately move to giving answers if a user answer is given
  useEffect(() => {
    if (quizState !== QuizStates.Listen) return
    setQuizState(QuizStates.Answer)
    // will passing setQuizState cause problems
  }, [activeHarpStrata, setQuizState, quizState])

  // In answer state, the harpstrata should be updated to include the
  // correct answer, and any further modifications to the harpstrata
  // while this is happening should be overwritten
  useEffect(() => {
    if (quizState === QuizStates.Wait) return
    const resetActiveHarpStrata = () => {
      const harpStrataProps = getPropsForHarpStrata(
        activeHarpStrata,
        DisplayModes.Degree
      )
      setActiveHarpStrata(getHarpStrata({
        ...harpStrataProps,
        activeIds: [],
      }))
    }
    if (quizState === QuizStates.Answer) {
      // TODO: if the active harpstrata doesn't contain the right answer
      // then run the following function. We'll need to look at the active
      // mode to determine whether to look at the active degrees or the
      // active pitches
      //setActiveHarpStrata(activateHarpCell(activeHarpStrata, quizQuestion))
      const setNextQuestion = setTimeout(() => {
        setQuizState(QuizStates.Ask)
        setQuizQuestion(getNextQuizQuestion(quizQuestion, activeDisplayMode))
        resetActiveHarpStrata()
      }, 500)
      return () => clearTimeout(setNextQuestion)
    }
    if (activeHarpStrata.isActiveComplex.activeDegreeIds.length > 0) return resetActiveHarpStrata()
    return
  }, [quizState, activeHarpStrata, setActiveHarpStrata])

  const isDisplayPeriod = quizState === QuizStates.Ask
  const shouldDisplayQuestion =
    screenFree && isDisplayPeriod && activeExperienceMode === ExperienceModes.Quiz

  const flashAnimationValue = useTimingTransition(shouldDisplayQuestion, {
    duration: 200,
    easing: Easing.inOut(Easing.ease),
  })

  return [quizQuestion, flashAnimationValue]
}
