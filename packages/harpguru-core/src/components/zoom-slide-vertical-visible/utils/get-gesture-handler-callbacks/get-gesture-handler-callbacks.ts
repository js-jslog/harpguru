import type { Value } from 'react-native-reanimated'
import type { PanGestureHandlerGestureEvent } from 'react-native-gesture-handler'

import { getWithSnapProps } from '../get-withsnap-props'
import { getWithGestureOffset } from '../get-withgesture-offset'
import { getFromIndexOffset } from '../get-fromindex-offset'
import type { ColumnBounds } from '../../../../types'

type GestureHandlerCallbacks = {
  readonly onGesture: (arg0: PanGestureHandlerGestureEvent) => void
  readonly onStateChange: (arg0: PanGestureHandlerGestureEvent) => void
}
export const getGestureHandlerCallbacks = (
  baseSlotIndex: number,
  slideLength: number,
  trackLength: number,
  slideSpan: number,
  slotCount: number,
  slideOffsetAnimation: Value<number>,
  setLabelIndex: (arg0: number) => void,
  setSlotIndex: (arg0: number) => void,
  setSourceColumnBounds: (arg0: ColumnBounds) => void
): GestureHandlerCallbacks => {
  const onGesture = ({
    nativeEvent: { translationY },
  }: PanGestureHandlerGestureEvent) => {
    const baseSlideOffset = getFromIndexOffset(
      baseSlotIndex,
      trackLength,
      slotCount
    )
    const withGestureSlideOffset = getWithGestureOffset(
      baseSlideOffset,
      translationY,
      slideLength,
      trackLength
    )
    const { withSnapIndex } = getWithSnapProps(
      withGestureSlideOffset,
      trackLength,
      slotCount
    )
    setLabelIndex(withSnapIndex)
    slideOffsetAnimation.setValue(withGestureSlideOffset)
  }

  const onStateChange = ({
    nativeEvent: { translationY, state },
  }: PanGestureHandlerGestureEvent) => {
    const END_GESTURE = 5
    if (state !== END_GESTURE) return
    const baseSlideOffset = getFromIndexOffset(
      baseSlotIndex,
      trackLength,
      slotCount
    )
    const withGestureSlideOffset = getWithGestureOffset(
      baseSlideOffset,
      translationY,
      slideLength,
      trackLength
    )
    const { withSnapIndex } = getWithSnapProps(
      withGestureSlideOffset,
      trackLength,
      slotCount
    )
    setSlotIndex(withSnapIndex)
    const endHoleIndex = withSnapIndex + slideSpan
    const nextColumnBounds = [withSnapIndex, endHoleIndex] as ColumnBounds
    setSourceColumnBounds(nextColumnBounds)
  }

  return {
    onGesture,
    onStateChange,
  }
}
