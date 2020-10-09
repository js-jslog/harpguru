import { useGlobal } from 'reactn'
import Animated from 'react-native-reanimated'
import { TapGestureHandler } from 'react-native-gesture-handler'
import { View } from 'react-native'
import React from 'react'
import { getApparatusIds } from 'harpstrata'
import { Entypo } from '@expo/vector-icons'

import { OptionList } from '../option'
import { MenuCloseButton } from '../menu-close-button'
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

export const LayoutMenu = ({
  hideMenu,
  hideLabel,
  tapHandler,
}: MenuProps): React.ReactElement => {
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

  const {
    styles,
    menuSlideXTranslation,
    menuSlideYTranslation,
    menuScale,
    menuBackgroundColor,
    menuOpacity,
    labelCounterScale,
  } = getMenuStylesAndAnimationVals(hideMenu, hideLabel, 'BOTTOM')

  const sizes = getSizes()

  return (
    <Animated.View
      style={[
        styles.animated,
        {
          transform: [
            { translateX: menuSlideXTranslation },
            { translateY: menuSlideYTranslation },
            { scale: menuScale },
          ],
        },
      ]}
    >
      <Animated.View
        style={[
          styles.overlay,
          {
            backgroundColor: menuBackgroundColor,
            opacity: menuOpacity,
          },
        ]}
      >
        <View style={styles.mainContents}>
          <OptionList {...apparatusOptionProps} />
          <OptionList {...displayModeOptionProps} />
          <OptionList {...experienceModeOptionProps} />
          <MenuCloseButton tapHandler={tapHandler} />
        </View>
        <TapGestureHandler onHandlerStateChange={tapHandler}>
          <View style={styles.label}>
            <Animated.View
              style={[
                {
                  transform: [{ scale: labelCounterScale }],
                },
              ]}
            >
              <Entypo
                name="cog"
                size={sizes['7']}
                color={colors.inertOutline}
              />
            </Animated.View>
          </View>
        </TapGestureHandler>
      </Animated.View>
    </Animated.View>
  )
}
