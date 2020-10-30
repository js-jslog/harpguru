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
    console.log('::::::::::::::::::::::::::::::::::::: activeExperienceMode changed: ' + activeExperienceMode)
    console.log('::::::::::::::::::::::::::::::::::::: activeExperienceMode pre State: ' + quizState)
    if (activeExperienceMode === ExperienceModes.Quiz) return setQuizState(QuizStates.Ask)
    if (activeExperienceMode === ExperienceModes.Explore) return setQuizState(QuizStates.Wait)
    console.log('::::::::::::::::::::::::::::::::::::: activeExperienceMode new State: ' + quizState)
  }, [activeExperienceMode])

  // Move from asking to listening for answers after 1 second
  useEffect(() => {
    console.log(':::::::::::::::::::::::::::::: ask to listen: ' + quizState)
    if (quizState !== QuizStates.Ask) return
    console.log(':::::::::::::::::::::::::::::: ask to listen through')
    const finishAsking = setTimeout(() => {
      console.log(':::::::::::::::::::::::::::::: ask to listen happening')
      setQuizState(QuizStates.Listen)
    }, 1000)
    return () => {
      console.log(':::::::::::::::::::::::::::::: ask to listen cancel: ' + quizState)
      clearTimeout(finishAsking)
    }
  }, [quizState])

  // Give the user 5 seconds to respond before moving to giving answers
  useEffect(() => {
    console.log('::::::::::::::::::::::: listen to answer timeout: ' + quizState)
    if (quizState !== QuizStates.Listen) return
    console.log('::::::::::::::::::::::: listen to answer timeout through')
    const timeoutListenPhase = setTimeout(() => {
      console.log('::::::::::::::::::::::: listen to answer timeout happening')
      setQuizState(QuizStates.Answer)
    }, 5000)
    return () => {
      console.log('::::::::::::::::::::::: listen to answer timeout cancel: ' + quizState)
      clearTimeout(timeoutListenPhase)
    }
  }, [quizState])

  // Immediately move to giving answers if a user answer is given
  useEffect(() => {
    console.log(':::::::::::::::: listen to answer premature: ' + quizState)
    if (quizState !== QuizStates.Listen) return
    console.log(':::::::::::::::: listen to answer premature through')
    setQuizState(QuizStates.Answer)
    // will passing setQuizState cause problems
  }, [activeHarpStrata, setQuizState, quizState])

  // In answer state, the harpstrata should be updated to include the
  // correct answer, and any further modifications to the harpstrata
  // while this is happening should be overwritten
  useEffect(() => {
    console.log('::::::::: back to ask: ' + quizState)
    if (quizState === QuizStates.Wait) return
    console.log('::::::::: back to ask through')
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
      console.log('::::::::: back to ask - from answer' + quizState)
      // TODO: if the active harpstrata doesn't contain the right answer
      // then run the following function. We'll need to look at the active
      // mode to determine whether to look at the active degrees or the
      // active pitches
      //setActiveHarpStrata(activateHarpCell(activeHarpStrata, quizQuestion))
      const setNextQuestion = setTimeout(() => {
        console.log('::::::::: back to ask - setting next question after 500')
        setQuizState(QuizStates.Ask)
        setQuizQuestion(getNextQuizQuestion(quizQuestion, activeDisplayMode))
        resetActiveHarpStrata()
      }, 500)
      return () => {
        console.log('::::::::: back to ask - cancel')
        clearTimeout(setNextQuestion)
      }
    }
    if (activeHarpStrata.isActiveComplex.activeDegreeIds.length > 0) {
      console.log('::::::::: back to ask - setting face back to blank')
      return resetActiveHarpStrata()
    }
    console.log('::::::::: back to ask - none of the above')
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
