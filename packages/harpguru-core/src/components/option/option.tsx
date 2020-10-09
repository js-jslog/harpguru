import { useTimingTransition } from 'react-native-redash'
import Animated, { Easing, interpolate } from 'react-native-reanimated'
import {
  PanGestureHandler,
  PanGestureHandlerGestureEvent,
  State,
} from 'react-native-gesture-handler'
import { View, Text } from 'react-native'
import React, { useState } from 'react'

import { getSizes } from '../../styles'
import { usePrevious } from '../../hooks'

import { getStyles, getDynamicStyles } from './option-styles'

type OptionProps = {
  readonly title: string
  readonly optionId: string
  readonly nudgeFunction: (arg0: 'UP' | 'DOWN') => void
}

export const Option = (props: OptionProps): React.ReactElement => {
  const [state, setState] = useState(State.UNDETERMINED)
  const [translationY, setTranslationY] = useState(0)
  const previousState = usePrevious(state, State.UNDETERMINED)
  const styles = getStyles()
  const sizes = getSizes()
  const { 8: swipeThreshold } = sizes

  const { title, optionId, nudgeFunction } = props

  const dynamicStyles = getDynamicStyles(state)

  if (state === State.END && previousState === State.ACTIVE) {
    if (translationY > 0) {
      nudgeFunction('UP')
    } else {
      nudgeFunction('DOWN')
    }
  }

  const handlePozitionSwipe = ({
    nativeEvent,
  }: PanGestureHandlerGestureEvent) => {
    setState(nativeEvent.state)
    setTranslationY(nativeEvent.translationY)
  }

  const previousOptionId = usePrevious(optionId, '')
  const isUpdated = optionId !== previousOptionId
  const optionUpdatedVal = useTimingTransition(isUpdated, {
    duration: 300,
    easing: Easing.inOut(Easing.circle),
  })
  const optionUpdateTransition = interpolate(optionUpdatedVal, {
    inputRange: [0, 1],
    outputRange: isUpdated ? [2, 1] : [1, 1],
  })

  return (
    <PanGestureHandler
      shouldCancelWhenOutside={true}
      activeOffsetY={[swipeThreshold * -1, swipeThreshold]}
      onHandlerStateChange={handlePozitionSwipe}
    >
      <View style={[styles.option, dynamicStyles.activeSwipeStyle]}>
        <OptionTitle>{title}</OptionTitle>
        <View>
          <InactiveOptionValue>{optionId}</InactiveOptionValue>
          <InactiveOptionValue>{optionId}</InactiveOptionValue>
          <Animated.View
            style={[
              {
                transform: [{ scale: optionUpdateTransition }],
              },
            ]}
          >
            <ActiveOptionValue>{optionId}</ActiveOptionValue>
          </Animated.View>
          <InactiveOptionValue>{optionId}</InactiveOptionValue>
          <InactiveOptionValue>{optionId}</InactiveOptionValue>
        </View>
      </View>
    </PanGestureHandler>
  )
}

type ChildProps = {
  readonly children: React.ReactNode
}

const OptionTitle = ({ children }: ChildProps): React.ReactElement => {
  const styles = getStyles()
  return <Text style={styles.optionTitle}>{children}</Text>
}
const InactiveOptionValue = ({ children }: ChildProps): React.ReactElement => {
  const styles = getStyles()
  return <Text style={styles.inactiveOptionValue}>{children}</Text>
}
const ActiveOptionValue = ({ children }: ChildProps): React.ReactElement => {
  const styles = getStyles()
  return <Text style={styles.activeOptionValue}>{children}</Text>
}
