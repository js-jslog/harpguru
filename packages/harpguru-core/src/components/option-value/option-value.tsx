import { useTimingTransition } from 'react-native-redash'
import Animated, { Easing, interpolate } from 'react-native-reanimated'
import { TapGestureHandler, State } from 'react-native-gesture-handler'
import type { TapGestureHandlerStateChangeEvent } from 'react-native-gesture-handler'
import { View, Text, TextStyle } from 'react-native'
import React, { useState } from 'react'

import { OptionIds } from '../../types'
import { tapAnimationDuration } from '../../constants'

type OptionValueProps = {
  readonly id: OptionIds | undefined
  readonly isActive: boolean
  readonly setFunction: (arg0: OptionIds) => void
  readonly style: TextStyle
}

export const OptionValue = ({
  id,
  isActive,
  setFunction,
  style,
}: OptionValueProps): React.ReactElement => {
  const [isTapped, setIsTapped] = useState(false)
  const transitionValue = useTimingTransition(isTapped, {
    duration: tapAnimationDuration,
    easing: Easing.inOut(Easing.circle),
  })
  const animationValue = interpolate(transitionValue, {
    inputRange: [0, 1],
    outputRange: isTapped ? [1, 1.8] : [1, 1.8],
  })
  const handleTapStateChange = ({
    nativeEvent,
  }: TapGestureHandlerStateChangeEvent) => {
    if (id === undefined) return
    if (nativeEvent.state === State.BEGAN) setIsTapped(true)
    if ([State.FAILED, State.CANCELLED].includes(nativeEvent.state))
      setIsTapped(false)
    if (nativeEvent.state !== State.END) return

    setIsTapped(false)
    setFunction(id)
  }
  return (
    <TapGestureHandler onHandlerStateChange={handleTapStateChange}>
      <Animated.View
        style={[
          {
            transform: [{ scale: isActive ? 1 : animationValue }],
          },
        ]}
      >
        <View>
          <Text style={style}>{id ? id : ' '}</Text>
        </View>
      </Animated.View>
    </TapGestureHandler>
  )
}
