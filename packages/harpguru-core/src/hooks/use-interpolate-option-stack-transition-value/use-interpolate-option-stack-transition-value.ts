import { interpolate } from 'react-native-reanimated'

import { getInputRange, getOutputRange } from '../../utils'

// TODO: This is not a hook. It should be renamed.
// I feel like this might not even be necessary in some
// cases. The OptionList component for example does
// another interpolation, so what's the value.
export const useInterpolateOptionStackTransitionValue = (
  rangeLength: number,
  index: number,
  transitionValue: number
): number => {
  'worklet'
  const inputRange = getInputRange(rangeLength)
  const outputRange = getOutputRange(index, rangeLength)
  return interpolate(transitionValue, inputRange, outputRange)
}
