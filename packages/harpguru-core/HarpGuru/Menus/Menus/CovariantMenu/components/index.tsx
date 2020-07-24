import React from 'react'

import { MenuContainer } from '../../MenuContainer'
import {
  DisplayModeOption,
  HarpKeyOption,
  RootPitchOption,
  PozitionOption,
} from '../../../Options'

export const CovariantMenu = (): React.ReactElement => {
  return (
    <MenuContainer>
      <HarpKeyOption />
      <PozitionOption />
      <RootPitchOption />
      <DisplayModeOption />
    </MenuContainer>
  )
}
