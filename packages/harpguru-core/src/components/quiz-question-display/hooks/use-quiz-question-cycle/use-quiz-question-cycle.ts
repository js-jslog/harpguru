import { useGlobal } from 'reactn'
import { useTimingTransition } from 'react-native-redash'
import { Easing } from 'react-native-reanimated'
import type { Node } from 'react-native-reanimated'
import { useState, useEffect } from 'react'
import { DegreeIds, getHarpStrata } from 'harpstrata'
import type { PitchIds } from 'harpstrata'

import { activateHarpCell } from '../../../../utils/set-global-reducers/utils'
import { ExperienceModes, DisplayModes } from '../../../../types'
import { getPropsForHarpStrata } from '../../../../utils'
import { getNextQuizQuestion } from '../../../../utils/get-next-quiz-question'

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
  const [activeExperienceMode] = useGlobal('activeExperienceMode')
  const [activeHarpStrata, setActiveHarpStrata] = useGlobal('activeHarpStrata')
  const [activeDisplayMode] = useGlobal('activeDisplayMode')

  const resetActiveHarpStrata = () => {
    console.log(':: resetting activeHarpStrata')
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
    console.log('::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::: adding correct answer')
    const newHarpStrata = activateHarpCell(activeHarpStrata, quizQuestion)
    setActiveHarpStrata(newHarpStrata)
  }

  // Start asking questions when the experience mode is set to Quiz
  useEffect(() => {
    console.log('::::::::::::::::::: changed experience mode or screenFree')
    if (!screenFree) {
      console.log('::::::::::::::::::: screen not free so going to wait')
      return setQuizState(QuizStates.Wait)
    }
    if (activeExperienceMode === ExperienceModes.Quiz) {
      console.log('::::::::::::::::::: update to ask')
      return setQuizState(QuizStates.Ask)
    }
    if (activeExperienceMode === ExperienceModes.Explore) {
      console.log('::::::::::::::::::: update to wait')
      return setQuizState(QuizStates.Wait)
    }
  }, [activeExperienceMode, screenFree])

  useEffect(() => {
    // Move from asking to listening for answers after 1 second
    if (quizState === QuizStates.Ask) {
      resetActiveHarpStrata()
      console.log('::::::::::::::::::: ask to listen planned')
      const finishAsking = setTimeout(() => {
        console.log('::::::::::::::::::: ask to listen happening')
        setQuizState(QuizStates.Listen)
      }, 1000)
      return () => {
        console.log('::::::::::::::::::: ask to listen cancelled')
        clearTimeout(finishAsking)
      }
    }
    if (quizState === QuizStates.Listen) {
      console.log('::::::::::::::::::: listen to answer planned')
      const finishListening = setTimeout(() => {
        console.log('::::::::::::::::::: listen to answer happening')
        setQuizState(QuizStates.Answer)
      }, 10000)
      return () => {
        console.log('::::::::::::::::::: listen to answer cancelled')
        clearTimeout(finishListening)
      }
    }
    if (quizState === QuizStates.Answer) {
      console.log('::::::::::::::::::: answer to ask planned')
      addCorrectAnswer()
      setQuizQuestion(getNextQuizQuestion(quizQuestion, activeDisplayMode))
      const onToNextQuestion = setTimeout(() => {
        console.log('::::::::::::::::::: answer to ask happening')
        setQuizState(QuizStates.Ask)
      }, 5000)
      return () => {
        console.log('::::::::::::::::::: answer to ask cancelled')
        clearTimeout(onToNextQuestion)
      }
    }
    console.log('::::::::::::::::::: quiz state updated with NO EFFECT')
    return
  }, [quizState])

  // In answer state, the harpstrata should be updated to include the
  // correct answer, and any further modifications to the harpstrata
  // while this is happening should be overwritten
  useEffect(() => {
    console.log(':::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::: harpstrata updated' + activeHarpStrata.isActiveComplex.activeDegreeIds.length)
    if (quizState === QuizStates.Wait || quizState === QuizStates.Answer) {
      console.log(':::::::::::: harpstrata updated - wait no effect')
      return
    }
    if (quizState === QuizStates.Listen) {
      console.log(':::::::::::: harpstrata updated - listen so going to answer')
      return setQuizState(QuizStates.Answer)
    }
    if (quizState === QuizStates.Ask) {
      console.log(':::::::::::: harpstrata updated - bad moment so setting empty')
      return resetActiveHarpStrata()
    }
    console.log(':::::::::::: harpstrata updated with NO EFFECT')
    return
  }, [activeHarpStrata])

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
