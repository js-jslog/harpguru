import React from 'react'
import type { ReactElement } from 'react'

import { AnimatedMenuContainer, CovariantMenu } from '../../Menus'
import type { CovariantMenuProps } from '../../Menus'

type CovariantMenuScreenProps = CovariantMenuProps & {
  readonly onScreen: boolean
}

export const CovariantMenuScreen = (
  props: CovariantMenuScreenProps
): ReactElement => {
  const { onScreen } = props
  const { activeDisplayMode, setActiveDisplayMode } = props
  const covariantMenuProps = {
    activeDisplayMode,
    setActiveDisplayMode,
  }
  return (
    <AnimatedMenuContainer onScreen={onScreen}>
      <CovariantMenu {...covariantMenuProps} />
    </AnimatedMenuContainer>
  )
}
