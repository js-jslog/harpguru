import { useGlobal } from 'reactn'
import Animated from 'react-native-reanimated'
import { TapGestureHandler } from 'react-native-gesture-handler'
import { StyleSheet, View, Text } from 'react-native'
import React from 'react'

import { Option } from '../option'
import { getMenuStylesAndAnimationVals } from '../../utils'
import type { MenuProps } from '../../types'
import { useNudgeDisplayMode } from '../../hooks'

import {
  useNudgeHarpStrataByHarpKey,
  useNudgeHarpStrataByPozition,
  useNudgeHarpStrataByRootPitch,
} from './hooks'

export const CovariantMenu = ({
  hideLabel,
  hideMenu,
  tapHandler,
}: MenuProps): React.ReactElement => {
  const [activeHarpStrata] = useGlobal('activeHarpStrata')

  const { harpKeyId } = activeHarpStrata
  const nudgeHarpStrataByHarpKey = useNudgeHarpStrataByHarpKey()
  const harpKeyOptionProps = {
    title: 'Harp Key',
    optionId: harpKeyId,
    nudgeFunction: nudgeHarpStrataByHarpKey,
  }

  const { pozitionId } = activeHarpStrata
  const nudgeHarpStrataByPozition = useNudgeHarpStrataByPozition()
  const pozitionOptionProps = {
    title: 'Position',
    optionId: pozitionId,
    nudgeFunction: nudgeHarpStrataByPozition,
  }

  const { rootPitchId } = activeHarpStrata
  const nudgeHarpStrataByRootPitch = useNudgeHarpStrataByRootPitch()
  const rootPitchOptionProps = {
    title: 'Position Key',
    optionId: rootPitchId,
    nudgeFunction: nudgeHarpStrataByRootPitch,
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
    menuSlideTranslation,
    menuScale,
    menuBackgroundColor,
    labelOpacity,
    labelCounterScale,
  } = getMenuStylesAndAnimationVals(hideMenu, hideLabel, 'LEFT')

  return (
    <Animated.View
      style={[
        styles.animated,
        {
          transform: [
            { translateX: menuSlideTranslation },
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
            },
          ]}
        >
          <View style={styles.mainContents}>
            <View style={{flex:1}} >
              <View style={{...StyleSheet.absoluteFillObject, flexDirection: 'row', alignItems: 'center'}} >
                <View style={{flex:1, alignItems: 'center', justifyContent: 'center', height: 200}} >
                  <Text>locked</Text>
                </View>
              </View>
              <Option {...harpKeyOptionProps} />
            </View>
            <Option {...pozitionOptionProps} />
            <Option {...rootPitchOptionProps} />
            <Option {...displayModeOptionProps} />
          </View>
          <View style={styles.rotatedLabel}>
            <Animated.View
              style={[
                {
                  transform: [{ scale: labelCounterScale }],
                  opacity: labelOpacity,
                },
              ]}
            >
              <View style={styles.labelAligner}>
                <Text style={styles.text}>Tuning</Text>
              </View>
            </Animated.View>
          </View>
        </Animated.View>
      </TapGestureHandler>
    </Animated.View>
  )
}
