import { useTimingTransition } from 'react-native-redash'
import Animated, { Easing, interpolate } from 'react-native-reanimated'
import { TapGestureHandler, State } from 'react-native-gesture-handler'
import type { TapGestureHandlerStateChangeEvent } from 'react-native-gesture-handler'
import { View, Text, StyleSheet } from 'react-native'
import React, { useState } from 'react'

import { OptionIds } from '../../types'
import { getSizes, colors } from '../../styles'
import { tapAnimationDuration } from '../../constants'

type OptionValueProps = {
  readonly id: OptionIds | undefined
  readonly isActive: boolean
  readonly setFunction: (arg0: OptionIds) => void
}

export const OptionValue = ({
  id,
  isActive,
  setFunction,
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

  const sizes = getSizes()
  const { baseStyle, activeStyle } = StyleSheet.create({
    baseStyle: {
      alignSelf: 'center',
      textAlign: 'center',
      fontSize: sizes['7'],
      lineHeight: sizes['8'],
      color: colors.inertOutline,
      minWidth: '50%',
    },
    activeStyle: {
      // sizes['8'] is just a little too big for the wide
      // words to fit in the column. This is a compromise
      // since I can't think of a better way to highlight
      // the words. When they are not all capital letters
      // anymore this should be less of a problem.
      fontSize: sizes['7'] + sizes['5'],
      fontWeight: 'bold',
      lineHeight: sizes['9'],
    },
  })
  const style = isActive ? [baseStyle, activeStyle] : baseStyle

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
