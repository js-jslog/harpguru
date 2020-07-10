import React from 'react'

import { MenuContainer } from '../../MenuContainer'
import type { MenuProps } from '../../../types'
import {
  DisplayModeOption,
  HarpKeyOption,
  RootPitchOption,
  PozitionOption,
} from '../../../Options'

export const CovariantMenu = (props: MenuProps): React.ReactElement => {
  return (
    <MenuContainer>
      <HarpKeyOption {...props} />
      <PozitionOption {...props} />
      <RootPitchOption {...props} />
      <DisplayModeOption {...props} />
    </MenuContainer>
  )
}
