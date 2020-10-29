import Animated, { add } from 'react-native-reanimated'
import { TapGestureHandler } from 'react-native-gesture-handler'
import { View, StyleSheet } from 'react-native'
import React from 'react'

import {
  getMenuAnimationValues,
  getScaledMenuLabelProtrusion,
} from '../../utils'
import type { MenuProps, ChildrenProps } from '../../types'

import { useTapAnimation } from './hooks'

export const MenuOpenButton = ({
  hideMenu,
  hideLabel,
  stashPosition,
  openCloseMenu,
  children,
}: MenuProps & ChildrenProps): React.ReactElement => {
  const { labelCounterScale } = getMenuAnimationValues(
    hideMenu,
    hideLabel,
    stashPosition
  )
  const scaledLabelProtrusion = getScaledMenuLabelProtrusion()

  const { style } = StyleSheet.create({
    style: {
      alignItems: 'center',
      justifyContent: 'center',
      width: scaledLabelProtrusion,
    },
  })

  const [tapAnimationValue, handleTapStateChange] = useTapAnimation(
    openCloseMenu
  )
  const totalScaleValue = add(tapAnimationValue, labelCounterScale)

  return (
    <TapGestureHandler onHandlerStateChange={handleTapStateChange}>
      <View style={style}>
        <Animated.View
          style={[
            {
              transform: [{ scale: totalScaleValue }],
            },
          ]}
        >
          {children}
        </Animated.View>
      </View>
    </TapGestureHandler>
  )
}
