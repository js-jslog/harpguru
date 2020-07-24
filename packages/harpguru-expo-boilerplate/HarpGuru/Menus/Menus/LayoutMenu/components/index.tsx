import React from 'react'

import { MenuContainer } from '../../MenuContainer'
import {
  ApparatusOption,
  DisplayModeOption,
  ExperienceModeOption,
} from '../../../Options'

export const LayoutMenu = (): React.ReactElement => {
  return (
    <MenuContainer>
      <ApparatusOption />
      <ExperienceModeOption />
      <DisplayModeOption />
    </MenuContainer>
  )
}
