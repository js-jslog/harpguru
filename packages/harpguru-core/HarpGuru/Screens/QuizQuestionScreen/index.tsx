import React, { useGlobal, useEffect, useDispatch } from 'reactn'
import { ReactElement, useState } from 'react'

import type { DisplayModes } from '../../types'
import { ExperienceModes } from '../../helpers/setGlobalReactNState'
import { AnimatedMenuContainer, QuizQuestionDisplay } from '../../Menus'

type QuizQuestionScreenProps = {
  readonly screenFree: boolean
  readonly activeDisplayMode: DisplayModes
}

export const QuizQuestionScreen = (
  props: QuizQuestionScreenProps
): ReactElement => {
  const [displayPeriod, setDisplayPeriod] = useState<boolean>(true)
  const [quizQuestion] = useGlobal('quizQuestion')
  const [activeExperienceMode] = useGlobal('activeExperienceMode')
  const { screenFree, activeDisplayMode } = props
  const requestNextQuestion = useDispatch('requestNextQuestion')
  useEffect(() => {
    setDisplayPeriod(true)
    const nextQuestionTimer = setTimeout(() => {
      if (activeExperienceMode === ExperienceModes.Quiz)
        requestNextQuestion(activeDisplayMode)
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
