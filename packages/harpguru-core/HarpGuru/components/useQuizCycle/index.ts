import { useGlobal, useDispatch } from 'reactn'
import { useEffect } from 'react'

import { MenuStates } from '../useSwipeMenus'
import { ExperienceModes } from '../../helpers/setGlobalReactNState'
import { usePrevious } from '../../helpers'

export const useQuizCycle = (menuState: MenuStates): void => {
  const previousMenuState = usePrevious(menuState, menuState)
  const [quizQuestion] = useGlobal('quizQuestion')
  const [activeExperienceMode] = useGlobal('activeExperienceMode')
  const requestNextQuestion = useDispatch('requestNextQuestion')
  useEffect(() => {
    if (menuState === MenuStates.NoMenu && previousMenuState !== menuState) {
      requestNextQuestion()
    }
    if (activeExperienceMode === ExperienceModes.Quiz) {
      const nextQuestionTimer = setTimeout(() => {
        requestNextQuestion()
      }, 5000)
      return () => clearTimeout(nextQuestionTimer)
    }
    return
  }, [quizQuestion, activeExperienceMode, menuState])
}
