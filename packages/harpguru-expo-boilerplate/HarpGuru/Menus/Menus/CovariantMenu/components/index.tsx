import React from 'react'

import { MenuContainer } from '../../MenuContainer'
import {
  DisplayModeOption,
  HarpKeyOption,
  RootPitchOption,
  PozitionOption,
} from '../../../Options'
import type {
  RootPitchOptionProps,
  PozitionOptionProps,
  HarpKeyOptionProps,
  DisplayModeOptionProps,
} from '../../../Options'

export type CovariantMenuProps = HarpKeyOptionProps &
  PozitionOptionProps &
  RootPitchOptionProps &
  DisplayModeOptionProps

export const CovariantMenu = (
  props: CovariantMenuProps
): React.ReactElement => {
  return (
    <MenuContainer>
      <HarpKeyOption {...props} />
      <PozitionOption {...props} />
      <RootPitchOption {...props} />
      <DisplayModeOption {...props} />
    </MenuContainer>
  )
}
