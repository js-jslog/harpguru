import { useGlobal } from 'reactn'
import React from 'react'
import { getApparatusIds } from 'harpparts'
import { Entypo } from '@expo/vector-icons'

import { Option } from '../option'
import { MenuOpenButton } from '../menu-open-button'
import { MenuFace } from '../menu-face'
import { Menu } from '../menu'
import { MenuProps, OptionIds } from '../../types'
import { colors, getSizes } from '../../styles'

import {
  useNudgeHarpStrataByApparatus,
  useSetHarpStrataByApparatus,
} from './hooks'

export const LayoutMenu = (menuProps: MenuProps): React.ReactElement => {
  const [activeHarpStrata] = useGlobal('activeHarpStrata')
  const nudgeHarpStrataByApparatus = useNudgeHarpStrataByApparatus()
  const setHarpStrataByApparatus = useSetHarpStrataByApparatus()
  const {
    apparatus: { id: apparatusId },
  } = activeHarpStrata
  const apparatusOptionProps = {
    title: 'Tuning',
    activeOptionId: apparatusId,
    orderedOptionIds: getApparatusIds(),
    nudgeFunction: nudgeHarpStrataByApparatus,
    setFunction: setHarpStrataByApparatus as (arg0: OptionIds) => void,
  }

  const sizes = getSizes()

  return (
    <Menu {...menuProps}>
      <MenuFace {...menuProps}>
        <Option {...apparatusOptionProps} />
      </MenuFace>
      <MenuOpenButton {...menuProps}>
        <Entypo name="cog" size={sizes['7']} color={colors.homeRowsColor} />
      </MenuOpenButton>
    </Menu>
  )
}
