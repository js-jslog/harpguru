import Animated, { add } from 'react-native-reanimated'
import { TapGestureHandler } from 'react-native-gesture-handler'
import { View, StyleSheet } from 'react-native'
import React from 'react'

import {
  getMenuAnimationValues,
  getScaledMenuLabelProtrusion,
} from '../../utils'
import type { MenuProps, ChildrenProps } from '../../types'
import { useScaleAndCallbackOnTap } from '../../hooks'

export const MenuOpenButton = ({
  isMenuHidden,
  isLabelHidden,
  stashPosition,
  openCloseMenu,
  children,
}: MenuProps & ChildrenProps): React.ReactElement => {
  const { labelCounterScale } = getMenuAnimationValues(
    isMenuHidden,
    isLabelHidden,
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

  const [tapAnimationValue, handleTapStateChange] = useScaleAndCallbackOnTap(
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
