import { useGlobal } from 'reactn'
import React from 'react'
import { getApparatusIds } from 'harpparts'
import { Entypo } from '@expo/vector-icons'

import { Option } from '../option'
import { MenuOpenButton } from '../menu-open-button'
import { MenuFace } from '../menu-face'
import { Menu } from '../menu'
import {
  MenuProps,
  OptionIds,
  ExperienceModes,
  DisplayModes,
} from '../../types'
import { colors, getSizes } from '../../styles'
import { useNudgeDisplayMode } from '../../hooks'

import {
  useNudgeHarpStrataByApparatus,
  useNudgeExperienceMode,
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

  const [activeExperienceMode, setActiveExperienceMode] = useGlobal(
    'activeExperienceMode'
  )
  const nudgeExperienceMode = useNudgeExperienceMode()
  const experienceModeOptionProps = {
    title: 'Experience',
    activeOptionId: activeExperienceMode,
    orderedOptionIds: [ExperienceModes.Quiz, ExperienceModes.Explore],
    nudgeFunction: nudgeExperienceMode,
    setFunction: setActiveExperienceMode as (arg0: OptionIds) => void,
  }

  const [activeDisplayMode, setActiveDisplayMode] = useGlobal(
    'activeDisplayMode'
  )
  const nudgeDisplayMode = useNudgeDisplayMode()
  const displayModeOptionProps = {
    title: 'Display',
    activeOptionId: activeDisplayMode,
    orderedOptionIds: [DisplayModes.Pitch, DisplayModes.Degree],
    nudgeFunction: nudgeDisplayMode,
    setFunction: setActiveDisplayMode as (arg0: OptionIds) => void,
  }

  const sizes = getSizes()

  return (
    <Menu {...menuProps}>
      <MenuFace {...menuProps}>
        <Option {...apparatusOptionProps} />
        <Option {...displayModeOptionProps} />
        <Option {...experienceModeOptionProps} />
      </MenuFace>
      <MenuOpenButton {...menuProps}>
        <Entypo name="cog" size={sizes['7']} color={colors.pageColor} />
      </MenuOpenButton>
    </Menu>
  )
}
