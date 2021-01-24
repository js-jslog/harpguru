import { cond, eq, sub, Node, add, interpolate } from 'react-native-reanimated'

import type { OptionStackPointerProps } from '../../option-stack-pointer'
import { useInterpolateOptionStackTransitionValue } from '../../../../hooks'

type PointerProperties = {
  readonly prevInStack: () => void
  readonly nextInStack: () => void
  readonly prevPointerEvents: Node<'none' | 'auto'>
  readonly nextPointerEvents: Node<'none' | 'auto'>
  readonly prevPointerOpacity: Node<number>
  readonly nextPointerOpacity: Node<number>
}

export const useOptionStackPointerProperties = (
  props: OptionStackPointerProps
): PointerProperties => {
  const { stackLength, stateValue, transitionValue } = props
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
    eq(stateValue, stackLength - 1),
    'none',
    'auto'
  )
  const prevPointerOpacity = interpolate(
    useInterpolateOptionStackTransitionValue(stackLength, 0, transitionValue),
    {
      inputRange: [0, 1],
      outputRange: [1, 0],
    }
  )
  const nextPointerOpacity = interpolate(
    useInterpolateOptionStackTransitionValue(
      stackLength,
      stackLength - 1,
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
