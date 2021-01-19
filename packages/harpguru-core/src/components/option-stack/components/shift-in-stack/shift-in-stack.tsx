import Animated, {
  cond,
  eq,
  sub,
  Node,
  add,
  interpolate,
} from 'react-native-reanimated'
import { TouchableOpacity } from 'react-native-gesture-handler'
import React from 'react'
import { AntDesign } from '@expo/vector-icons'

import { getStyles } from '../../utils'
import type {
  OptionStackProps,
  WithStateValue,
  WithTransition,
} from '../../types'
import { useInterpolateTransitionValue } from '../../hooks'
import { colors } from '../../../../styles'

type PointerProperties = {
  readonly prevInStack: () => void
  readonly nextInStack: () => void
  readonly prevPointerEvents: Node<'none' | 'auto'>
  readonly nextPointerEvents: Node<'none' | 'auto'>
  readonly prevPointerOpacity: Node<number>
  readonly nextPointerOpacity: Node<number>
}

const usePointerProperties = (
  props: OptionStackProps & WithStateValue & WithTransition
): PointerProperties => {
  const { optionPropsz, stateValue, transitionValue } = props
  const prevInStack = (): void => {
    const setValue = sub(stateValue, 1)
    stateValue.setValue(setValue)
  }
  const nextInStack = (): void => {
    const setValue = add(stateValue, 1)
    stateValue.setValue(setValue)
  }
  const prevPointerEvents = cond(eq(stateValue, 0), 'none', 'auto')
  const nextPointerEvents = cond(
    eq(stateValue, optionPropsz.length - 1),
    'none',
    'auto'
  )
  const prevPointerOpacity = interpolate(
    useInterpolateTransitionValue(optionPropsz.length, 0, transitionValue),
    {
      inputRange: [0, 1],
      outputRange: [1, 0],
    }
  )
  const nextPointerOpacity = interpolate(
    useInterpolateTransitionValue(
      optionPropsz.length,
      optionPropsz.length - 1,
      transitionValue
    ),
    {
      inputRange: [0, 1],
      outputRange: [1, 0],
    }
  )

  return {
    prevInStack,
    nextInStack,
    prevPointerEvents,
    nextPointerEvents,
    prevPointerOpacity,
    nextPointerOpacity,
  }
}

export const PreviousInStack = (
  props: OptionStackProps & WithStateValue & WithTransition
): React.ReactElement => {
  const {
    prevInStack,
    prevPointerEvents,
    prevPointerOpacity,
  } = usePointerProperties(props)
  const styles = getStyles()
  return (
    <Animated.View
      pointerEvents={prevPointerEvents}
      style={[{ opacity: prevPointerOpacity }]}
    >
      <TouchableOpacity onPress={prevInStack}>
        <AntDesign
          name="left"
          size={styles.titleFontSize}
          color={colors.inertOutline}
        />
      </TouchableOpacity>
    </Animated.View>
  )
}

export const NextInStack = (
  props: OptionStackProps & WithStateValue & WithTransition
): React.ReactElement => {
  const {
    nextInStack,
    nextPointerEvents,
    nextPointerOpacity,
  } = usePointerProperties(props)
  const styles = getStyles()
  return (
    <Animated.View
      pointerEvents={nextPointerEvents}
      style={[{ opacity: nextPointerOpacity }]}
    >
      <TouchableOpacity onPress={nextInStack}>
        <AntDesign
          name="right"
          size={styles.titleFontSize}
          color={colors.inertOutline}
        />
      </TouchableOpacity>
    </Animated.View>
  )
}
