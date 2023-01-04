import {
  withTiming,
  Easing,
  useSharedValue,
  useDerivedValue,
  interpolate,
} from 'react-native-reanimated'
import type { SharedValue } from 'react-native-reanimated'

import { getWindowDimensions } from '../../../../packages/get-window-dimensions'
import { overlayOpacity } from '../../../../constants'

type FlashAnimationValues = [
  SharedValue<number>,
  SharedValue<number>,
  SharedValue<number>,
  SharedValue<number>
]

export const useFlashAnimationValues = (
  shouldDisplay: boolean
): FlashAnimationValues => {
  const { longEdge } = getWindowDimensions()
  const guaranteeOffScreenWidth = longEdge
  const messageOpacity = useSharedValue(0)
  const explosionOpacity = useSharedValue(0)
  const messageScale = useSharedValue(0)
  const translateX = useSharedValue(0)
  const timingValue = useDerivedValue(() => {
    return withTiming(shouldDisplay ? 1 : 0, {
      duration: 500,
      easing: Easing.inOut(Easing.ease),
    })
  })
  useDerivedValue(() => {
    messageOpacity.value = interpolate(
      timingValue.value,
      [0, 1],
      [0, overlayOpacity]
    )
    explosionOpacity.value = shouldDisplay
      ? interpolate(timingValue.value, [0, 1], [overlayOpacity, 0])
      : interpolate(timingValue.value, [0, 1], [0, 0])
    messageScale.value = shouldDisplay
      ? interpolate(timingValue.value, [0, 1], [1, 2])
      : interpolate(timingValue.value, [0, 1], [3, 2])
    translateX.value = timingValue.value > 0 ? 0 : guaranteeOffScreenWidth
  })

  return [translateX, messageScale, explosionOpacity, messageOpacity]
}
