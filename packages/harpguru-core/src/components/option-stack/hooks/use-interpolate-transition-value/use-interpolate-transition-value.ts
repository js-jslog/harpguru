import { interpolate } from 'react-native-reanimated'
import type { Node } from 'react-native-reanimated'

import { getInputRange, getOutputRange } from '../../utils'

export const useInterpolateTransitionValue = (
  rangeLength: number,
  index: number,
  transitionValue: Node<number>
): Node<number> => {
  const inputRange = getInputRange(rangeLength)
  const outputRange = getOutputRange(index, rangeLength)
  return interpolate(transitionValue, {
    inputRange,
    outputRange,
  })
}
