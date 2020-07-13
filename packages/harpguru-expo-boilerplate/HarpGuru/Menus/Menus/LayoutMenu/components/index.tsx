import React from 'react'

import { MenuContainer } from '../../MenuContainer'
import { ApparatusOption, DisplayModeOption } from '../../../Options'
import type {
  ApparatusOptionProps,
  DisplayModeOptionProps,
} from '../../../Options'

export type LayoutMenuProps = ApparatusOptionProps & DisplayModeOptionProps

export const LayoutMenu = (props: LayoutMenuProps): React.ReactElement => {
  return (
    <MenuContainer>
      <ApparatusOption {...props} />
      <DisplayModeOption {...props} />
    </MenuContainer>
  )
}
