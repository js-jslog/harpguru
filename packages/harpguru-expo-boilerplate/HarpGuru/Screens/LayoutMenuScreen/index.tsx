import React from 'react'
import type { ReactElement } from 'react'

import { AnimatedMenuContainer, LayoutMenu } from '../../Menus'

type LayoutMenuScreenProps = {
  readonly onScreen: boolean
}

export const LayoutMenuScreen = (
  props: LayoutMenuScreenProps
): ReactElement => {
  const { onScreen } = props
  return (
    <AnimatedMenuContainer onScreen={onScreen}>
      <LayoutMenu />
    </AnimatedMenuContainer>
  )
}
