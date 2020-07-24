import React, { useGlobal, useEffect, useDispatch } from 'reactn'
import { ReactElement, useState } from 'react'

import { ExperienceModes } from '../../helpers/setGlobalReactNState'
import { AnimatedMenuContainer, QuizQuestionDisplay } from '../../Menus'

type QuizQuestionScreenProps = {
  readonly screenFree: boolean
}

export const QuizQuestionScreen = (
  props: QuizQuestionScreenProps
): ReactElement => {
  const [displayPeriod, setDisplayPeriod] = useState<boolean>(true)
  const [quizQuestion] = useGlobal('quizQuestion')
  const [activeExperienceMode] = useGlobal('activeExperienceMode')
  const { screenFree } = props
  const requestNextQuestion = useDispatch('requestNextQuestion')
  useEffect(() => {
    setDisplayPeriod(true)
    const nextQuestionTimer = setTimeout(() => {
      if (activeExperienceMode === ExperienceModes.Quiz) requestNextQuestion()
    }, 5000)
    const hideQuestionTimer = setTimeout(() => {
      setDisplayPeriod(false)
    }, 2000)
    return () => {
      clearTimeout(nextQuestionTimer)
      clearTimeout(hideQuestionTimer)
    }
  }, [quizQuestion])
  return (
    <AnimatedMenuContainer
      onScreen={
        screenFree &&
        displayPeriod &&
        activeExperienceMode === ExperienceModes.Quiz
      }
    >
      <QuizQuestionDisplay />
    </AnimatedMenuContainer>
  )
}
