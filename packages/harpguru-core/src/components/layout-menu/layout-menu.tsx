import { useGlobal } from 'reactn'
import Animated from 'react-native-reanimated'
import { TapGestureHandler } from 'react-native-gesture-handler'
import { View } from 'react-native'
import React from 'react'
import { Entypo } from '@expo/vector-icons'

import { Option } from '../option'
import { getMenuStylesAndAnimationVals } from '../../utils'
import type { MenuProps } from '../../types'
import { getSizes, colors } from '../../styles'
import { useNudgeDisplayMode } from '../../hooks'

import { useNudgeHarpStrataByApparatus, useNudgeExperienceMode } from './hooks'

export const LayoutMenu = ({
  hideMenu,
  hideLabel,
  tapHandler,
}: MenuProps): React.ReactElement => {
  const [activeHarpStrata] = useGlobal('activeHarpStrata')
  const nudgeHarpStrataByApparatus = useNudgeHarpStrataByApparatus()
  const {
    apparatus: { id: apparatusId },
  } = activeHarpStrata
  const apparatusOptionProps = {
    title: 'Tuning',
    optionId: apparatusId,
    nudgeFunction: nudgeHarpStrataByApparatus,
  }

  const [activeExperienceMode] = useGlobal('activeExperienceMode')
  const nudgeExperienceMode = useNudgeExperienceMode()
  const experienceModeOptionProps = {
    title: 'Experience',
    optionId: activeExperienceMode,
    nudgeFunction: nudgeExperienceMode,
  }

  const [activeDisplayMode] = useGlobal('activeDisplayMode')
  const nudgeDisplayMode = useNudgeDisplayMode()
  const displayModeOptionProps = {
    title: 'Display',
    optionId: activeDisplayMode,
    nudgeFunction: nudgeDisplayMode,
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
      <TapGestureHandler onHandlerStateChange={tapHandler}>
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
            <Option {...apparatusOptionProps} />
            <Option {...displayModeOptionProps} />
            <Option {...experienceModeOptionProps} />
          </View>
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
        </Animated.View>
      </TapGestureHandler>
    </Animated.View>
  )
}
