import React from 'reactn'
import { ReactElement } from 'react'

import { AnimatedMenuContainer, QuizQuestionDisplay } from '../../Menus'

import { useFlashDisplay } from './useFlashDisplay'

type QuizQuestionScreenProps = {
  readonly screenFree: boolean
}

export const QuizQuestionScreen = ({
  screenFree,
}: QuizQuestionScreenProps): ReactElement => {
  const shouldDisplay = useFlashDisplay(screenFree)
  return (
    <AnimatedMenuContainer onScreen={shouldDisplay}>
      <QuizQuestionDisplay />
    </AnimatedMenuContainer>
  )
}
