import { useTimingTransition } from 'react-native-redash'
import Animated, { Easing, interpolate } from 'react-native-reanimated'
import { TapGestureHandler, State } from 'react-native-gesture-handler'
import type { TapGestureHandlerStateChangeEvent } from 'react-native-gesture-handler'
import { View, Text } from 'react-native'
import React from 'react'

import { OptionIds } from '../../types'

import { getStyles } from './option-value-styles'

type OptionValueProps = {
  readonly id: OptionIds | undefined
  readonly preactiveId: OptionIds
  readonly setFunction: (arg0: OptionIds) => void
  readonly cancelFunction: () => void
}

export const OptionValue = ({
  id,
  preactiveId,
  setFunction,
  cancelFunction,
}: OptionValueProps): React.ReactElement => {
  const styles = getStyles()
  const isActive = preactiveId === id
  const transitionValue = useTimingTransition(isActive, {
    duration: 100,
    easing: Easing.inOut(Easing.circle),
  })
  const animationValue = interpolate(transitionValue, {
    inputRange: [0, 1],
    outputRange: isActive ? [1, 1.4] : [1, 1.4],
  })
  const handleTapStateChange = ({
    nativeEvent,
  }: TapGestureHandlerStateChangeEvent) => {
    if (id === undefined) return
    if (nativeEvent.state === State.BEGAN) setFunction(id)
    if (
      [State.FAILED, State.CANCELLED, State.UNDETERMINED].includes(
        nativeEvent.state
      )
    )
      cancelFunction()
  }

  const optionValuesActiveStyle = {
    ...styles.optionValues,
    ...styles.optionValuesActive,
  }
  const optionValuesStyle = { ...styles.optionValues }

  const style = isActive ? optionValuesActiveStyle : optionValuesStyle

  const withTapHandler = (
    <TapGestureHandler onHandlerStateChange={handleTapStateChange}>
      <Animated.View
        style={[
          {
            transform: [{ scale: animationValue }],
          },
        ]}
      >
        <View>
          <Text style={style}>{id ? id : ' '}</Text>
        </View>
      </Animated.View>
    </TapGestureHandler>
  )
  const withoutTapHandler = (
    <Animated.View
      style={[
        {
          transform: [{ scale: animationValue }],
        },
      ]}
    >
      <View>
        <Text style={style}>{id ? id : ' '}</Text>
      </View>
    </Animated.View>
  )
  return isActive ? withoutTapHandler : withTapHandler
}
