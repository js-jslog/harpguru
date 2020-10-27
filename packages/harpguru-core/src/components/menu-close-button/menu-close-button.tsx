import { useTimingTransition } from 'react-native-redash'
import Animated, { Easing, interpolate } from 'react-native-reanimated'
import { TapGestureHandler, State } from 'react-native-gesture-handler'
import type { TapGestureHandlerStateChangeEvent } from 'react-native-gesture-handler'
import { StyleSheet, View } from 'react-native'
import React from 'react'
import { AntDesign } from '@expo/vector-icons'

import type { MenuProps } from '../../types'
import { getSizes, colors } from '../../styles'
import { tapAnimationDuration } from '../../constants'

export const MenuCloseButton = ({
  openCloseTapHandler,
}: Pick<MenuProps, 'openCloseTapHandler'>): React.ReactElement => {
  const sizes = getSizes()
  const [isTapped, setIsTapped] = React.useState(false)
  const transitionValue = useTimingTransition(isTapped, {
    duration: tapAnimationDuration,
    easing: Easing.inOut(Easing.circle),
  })
  const animationValue = interpolate(transitionValue, {
    inputRange: [0, 1],
    outputRange: isTapped ? [1, 0.5] : [1, 0.5],
  })

  const handleTapAndAnimate = ({
    nativeEvent: { state },
  }: TapGestureHandlerStateChangeEvent) => {
    setIsTapped([State.BEGAN].includes(state))
    if (state !== State.END) return
    openCloseTapHandler()
  }

  return (
    <View
      style={{
        ...StyleSheet.absoluteFillObject,
        justifyContent: 'flex-end',
        flexDirection: 'row',
      }}
    >
      <TapGestureHandler onHandlerStateChange={handleTapAndAnimate}>
        <View
          style={{
            padding: sizes['6'],
            height: sizes['10'],
          }}
        >
          <Animated.View
            style={[
              {
                transform: [{ scale: animationValue }],
              },
            ]}
          >
            <AntDesign
              name="close"
              size={sizes['9']}
              color={colors.inertOutline}
            />
          </Animated.View>
        </View>
      </TapGestureHandler>
    </View>
  )
}
