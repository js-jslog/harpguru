import { useGlobal, useDispatch } from 'reactn'
import { useEffect } from 'react'

import { ExperienceModes } from '../../../../types/'
import { MenuStates } from '../../../../types'
import { usePrevious } from '../../../../hooks'

export const useQuizCycle = (menuState: MenuStates): void => {
  const previousMenuState = usePrevious(menuState, menuState)
  const [quizQuestion] = useGlobal('quizQuestion')
  const [activeExperienceMode] = useGlobal('activeExperienceMode')
  const [activeHarpStrata] = useGlobal('activeHarpStrata')
  const requestNextQuestion = useDispatch('requestNextQuestion')
  const revealAnswer = useDispatch('revealAnswer')
  const [bufferedActivityToggles] = useGlobal('bufferedActivityToggles')

  const isQuizMode = activeExperienceMode === ExperienceModes.Quiz

  const isMenuVisible = menuState !== MenuStates.NoMenu

  const screenBecameFree =
    menuState === MenuStates.NoMenu &&
    previousMenuState !== menuState &&
    activeExperienceMode === ExperienceModes.Quiz

  const {
    isActiveComplex: { activeDegreeIds },
  } = activeHarpStrata

  const answerGiven = activeDegreeIds.length > 0

  type CancelEffect = () => void

  const immmediatelyRequestQuestion = (): void => {
    requestNextQuestion()
  }

  const requestQuestionAheadOfDeadline = (): CancelEffect => {
    const revealTimer = setTimeout(() => {
      revealAnswer()
    }, 200)
    const nextQuestionTimer = setTimeout(() => {
      requestNextQuestion()
    }, 1500)
    return () => {
      clearTimeout(revealTimer)
      clearTimeout(nextQuestionTimer)
    }
  }

  const setNextQuestionDeadline = (): CancelEffect => {
    const nextQuestionTimer = setTimeout(() => {
      requestNextQuestion()
    }, 5000)
    return () => clearTimeout(nextQuestionTimer)
  }

  useEffect(() => {
    if (!isQuizMode) return
    if (isMenuVisible) return
    if (screenBecameFree) return immmediatelyRequestQuestion()
    if (answerGiven) return requestQuestionAheadOfDeadline()
    return setNextQuestionDeadline()
  }, [quizQuestion, screenBecameFree, answerGiven, bufferedActivityToggles])
}
