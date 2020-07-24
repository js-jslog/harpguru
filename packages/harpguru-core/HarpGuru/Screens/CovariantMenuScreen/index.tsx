import React from 'react'
import type { ReactElement } from 'react'

import { AnimatedMenuContainer, CovariantMenu } from '../../Menus'

type CovariantMenuScreenProps = {
  readonly onScreen: boolean
}

export const CovariantMenuScreen = (
  props: CovariantMenuScreenProps
): ReactElement => {
  const { onScreen } = props
  return (
    <AnimatedMenuContainer onScreen={onScreen}>
      <CovariantMenu />
    </AnimatedMenuContainer>
  )
}
