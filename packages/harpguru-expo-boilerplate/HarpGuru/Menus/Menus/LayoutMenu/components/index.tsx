import React from 'react'

import { MenuContainer } from '../../MenuContainer'
import { ApparatusOption, DisplayModeOption } from '../../../Options'
import type { DisplayModeOptionProps } from '../../../Options'

export type LayoutMenuProps = DisplayModeOptionProps

export const LayoutMenu = (props: LayoutMenuProps): React.ReactElement => {
  return (
    <MenuContainer>
      <ApparatusOption />
      <DisplayModeOption {...props} />
    </MenuContainer>
  )
}
