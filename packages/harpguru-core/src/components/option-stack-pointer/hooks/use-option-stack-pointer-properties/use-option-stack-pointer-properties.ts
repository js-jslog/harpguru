import { useDerivedValue, interpolate } from 'react-native-reanimated'
import type { SharedValue } from 'react-native-reanimated'

import type { OptionStackPointerProps } from '../../option-stack-pointer'
import { useInterpolateOptionStackTransitionValue } from '../../../../hooks'

type PointerProperties = {
  readonly prevInStack: () => void
  readonly nextInStack: () => void
  readonly prevPointerEvents: SharedValue<'none' | 'auto'>
  readonly nextPointerEvents: SharedValue<'none' | 'auto'>
  readonly prevPointerOpacity: SharedValue<number>
  readonly nextPointerOpacity: SharedValue<number>
}

export const useOptionStackPointerProperties = (
  props: OptionStackPointerProps
): PointerProperties => {
  const { stackLength, stateValue, transitionValue } = props
  const prevInStack = (): void => {
    stateValue.value = stateValue.value - 1
  }
  const nextInStack = (): void => {
    stateValue.value = stateValue.value + 1
  }
  const prevPointerEvents = useDerivedValue(() =>
    stateValue.value === 0 ? 'none' : 'auto'
  )
  const nextPointerEvents = useDerivedValue(() =>
    stateValue.value === stackLength - 1 ? 'none' : 'auto'
  )
  const prevPointerOpacity = useDerivedValue(() =>
    interpolate(
      useInterpolateOptionStackTransitionValue(
        stackLength,
        0,
        transitionValue.value
      ),
      [0, 1],
      [1, 0]
    )
  )
  const nextPointerOpacity = useDerivedValue(() =>
    interpolate(
      useInterpolateOptionStackTransitionValue(
        stackLength,
        stackLength - 1,
        transitionValue.value
      ),
      [0, 1],
      [1, 0]
    )
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
