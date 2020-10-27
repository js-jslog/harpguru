import { useGlobal } from 'reactn'
import { View, StyleSheet } from 'react-native'
import React from 'react'
import { getApparatusIds } from 'harpstrata'
import { Entypo } from '@expo/vector-icons'

import { Option } from '../option'
import { MenuOpenButton } from '../menu-open-button'
import { MenuCloseButton } from '../menu-close-button'
import { Menu } from '../menu'
import { getMenuStylesAndAnimationVals } from '../../utils'
import {
  MenuProps,
  OptionIds,
  ExperienceModes,
  DisplayModes,
} from '../../types'
import { getSizes, colors } from '../../styles'
import { useNudgeDisplayMode } from '../../hooks'

import {
  useNudgeHarpStrataByApparatus,
  useNudgeExperienceMode,
  useSetHarpStrataByApparatus,
} from './hooks'

export const LayoutMenu = (menuProps: MenuProps): React.ReactElement => {
  const { hideMenu, hideLabel, openCloseTapHandler } = menuProps
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

  const { labelCounterScale, labelProtrusion } = getMenuStylesAndAnimationVals(
    hideMenu,
    hideLabel,
    'BOTTOM'
  )

  const styles = StyleSheet.create({
    mainContents: {
      ...StyleSheet.absoluteFillObject,
      flexDirection: 'row',
      left: labelProtrusion,
    },
  })
  const sizes = getSizes()

  return (
    <Menu {...menuProps} position={'BOTTOM'}>
      <View style={styles.mainContents}>
        <Option {...apparatusOptionProps} />
        <Option {...displayModeOptionProps} />
        <Option {...experienceModeOptionProps} />
        <MenuCloseButton openCloseTapHandler={openCloseTapHandler} />
      </View>
      <MenuOpenButton
        counterScale={labelCounterScale}
        openCloseMenu={openCloseTapHandler}
        labelProtrusion={labelProtrusion}
      >
        <Entypo name="cog" size={sizes['7']} color={colors.inertOutline} />
      </MenuOpenButton>
    </Menu>
  )
}
