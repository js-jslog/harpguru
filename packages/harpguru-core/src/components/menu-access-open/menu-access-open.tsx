import Animated, { useAnimatedStyle } from 'react-native-reanimated'
import { GestureDetector } from 'react-native-gesture-handler'
import { StyleSheet } from 'react-native'
import React from 'react'

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

  const inflation = 50
  const [tapAnimationValue, tapGesture] = useScaleAndCallbackOnTap(
    openCloseMenu,
    inflation
  )

  const animatedStyle = useAnimatedStyle(() => {
    const totalScaleValue = tapAnimationValue.value + labelCounterScale.value
    return { transform: [{ scale: totalScaleValue }] }
  })

  return (
    <GestureDetector gesture={tapGesture}>
      <Animated.View style={style}>
        <Animated.View style={[animatedStyle]}>{children}</Animated.View>
      </Animated.View>
    </GestureDetector>
  )
}
