import Animated, { useAnimatedStyle } from 'react-native-reanimated'
import { GestureDetector } from 'react-native-gesture-handler'
import React from 'react'
import { AntDesign } from '@expo/vector-icons'

import { getColors } from '../../utils'
import type { MenuProps } from '../../types'
import { useHarpGuruStore } from '../../store'
import { useScaleAndCallbackOnTap } from '../../hooks'

export const MenuAccessClose = ({
  openCloseMenu,
}: Pick<MenuProps, 'openCloseMenu'>): React.ReactElement => {
  const staticSizes = useHarpGuruStore((state) => state.staticSizes)

  const inflation = 5
  const [tapAnimationValue, tapGesture] = useScaleAndCallbackOnTap(
    openCloseMenu,
    inflation
  )
  const animatedStyle = useAnimatedStyle(() => {
    return { transform: [{ scale: tapAnimationValue.value }] }
  })

  return (
    <GestureDetector gesture={tapGesture}>
      <Animated.View
        style={{
          position: 'absolute',
          top: 0,
          right: 0,
          padding: staticSizes['6'],
          height: staticSizes['10'],
        }}
      >
        <Animated.View style={[animatedStyle]}>
          <AntDesign
            name="close"
            size={staticSizes['9']}
            color={getColors().inertOutline}
          />
        </Animated.View>
      </Animated.View>
    </GestureDetector>
  )
}
