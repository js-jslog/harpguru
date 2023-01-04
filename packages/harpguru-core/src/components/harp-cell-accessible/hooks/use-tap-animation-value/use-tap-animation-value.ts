import {
  Easing,
  interpolate,
  withTiming,
  useDerivedValue,
} from 'react-native-reanimated'
import type { SharedValue } from 'react-native-reanimated'

import { tapAnimationDuration } from '../../../../constants'

export const useTapAnimationValue = (
  isTapped: boolean
): SharedValue<number> => {
  const timingValue = useDerivedValue(() => {
    return withTiming(isTapped ? 1 : 0, {
      duration: tapAnimationDuration,
      easing: Easing.inOut(Easing.circle),
    })
  }, [isTapped])
  const animationValue = useDerivedValue(() => {
    return interpolate(timingValue.value, [0, 1], isTapped ? [0.5, 1] : [1, 1])
  })

  return animationValue
}
