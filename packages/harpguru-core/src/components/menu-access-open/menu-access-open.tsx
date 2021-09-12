import Animated, { add } from 'react-native-reanimated'
import { TapGestureHandler } from 'react-native-gesture-handler'
import { View, StyleSheet } from 'react-native'
import React from 'react'

import { TapAnimationTypes } from '../../types'
import type { MenuProps, ChildrenProps } from '../../types'
import {
  useScaleAndCallbackOnTap,
  useMenuAnimationValues,
  useScaledMenuLabelProtrusion,
} from '../../hooks'

export const MenuAccessOpen = ({
  isMenuStashed,
  isLabelHidden,
  stashPosition,
  openCloseMenu,
  children,
}: MenuProps & ChildrenProps): React.ReactElement => {
  const { labelCounterScale } = useMenuAnimationValues(
    isMenuStashed,
    isLabelHidden,
    stashPosition
  )
  const scaledLabelProtrusion = useScaledMenuLabelProtrusion()

  const { style } = StyleSheet.create({
    style: {
      alignItems: 'center',
      justifyContent: 'center',
      width: scaledLabelProtrusion,
    },
  })

  const [tapAnimationValue, handleTapStateChange] = useScaleAndCallbackOnTap(
    openCloseMenu,
    [1, 5],
    [1, 5],
    TapAnimationTypes.Unsafe
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
