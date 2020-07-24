import React from 'react'

import { MenuContainer } from '../../MenuContainer'
import {
  ApparatusOption,
  DisplayModeOption,
  ExperienceModeOption,
} from '../../../Options'
import type { DisplayModeOptionProps } from '../../../Options'

export type LayoutMenuProps = DisplayModeOptionProps

export const LayoutMenu = (props: LayoutMenuProps): React.ReactElement => {
  return (
    <MenuContainer>
      <ApparatusOption />
      <ExperienceModeOption />
      <DisplayModeOption {...props} />
    </MenuContainer>
  )
}
