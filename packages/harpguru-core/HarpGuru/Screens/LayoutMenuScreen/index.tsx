import React from 'react'
import type { ReactElement } from 'react'

import { AnimatedMenuContainer, LayoutMenu } from '../../Menus'
import type { LayoutMenuProps } from '../../Menus'

type LayoutMenuScreenProps = LayoutMenuProps & {
  readonly onScreen: boolean
}

export const LayoutMenuScreen = (
  props: LayoutMenuScreenProps
): ReactElement => {
  const { onScreen } = props
  const {
    activeHarpStrata,
    setActiveHarpStrata,
    activeDisplayMode,
    setActiveDisplayMode,
  } = props
  const covariantMenuProps = {
    activeHarpStrata,
    setActiveHarpStrata,
    activeDisplayMode,
    setActiveDisplayMode,
  }
  return (
    <AnimatedMenuContainer onScreen={onScreen}>
      <LayoutMenu {...covariantMenuProps} />
    </AnimatedMenuContainer>
  )
}
