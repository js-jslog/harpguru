import type { Value } from 'react-native-reanimated'
import type { PanGestureHandlerGestureEvent } from 'react-native-gesture-handler'

import { getWithSnapProps } from '../get-withsnap-props'
import { getWithGestureOffset } from '../get-withgesture-offset'
import { getSlideFacts } from '../get-slide-facts'
import type { ColumnBounds } from '../../../../types'

type GestureHandlerCallbacks = {
  readonly onGesture: (arg0: PanGestureHandlerGestureEvent) => void
  readonly onStateChange: (arg0: PanGestureHandlerGestureEvent) => void
}
export const getGestureHandlerCallbacks = (
  columnBounds: readonly [number, number],
  columnCount: number,
  slideOffsetAnimation: Value<number>,
  setLabelColumnBounds: (arg0: readonly [number, number]) => void,
  setSlideColumnBounds: (arg0: readonly [number, number]) => void,
  setSourceColumnBounds: (arg0: ColumnBounds) => void
): GestureHandlerCallbacks => {
  const {
    slideOffsetLength,
    slideLength,
    trackLength,
    maxTrackIndex,
    slideIndexSpan,
  } = getSlideFacts(columnBounds, columnCount)

  const onGesture = ({
    nativeEvent: { translationY },
  }: PanGestureHandlerGestureEvent) => {
    const withGestureSlideOffset = getWithGestureOffset(
      slideOffsetLength,
      translationY,
      slideLength,
      trackLength
    )
    const { withSnapIndex } = getWithSnapProps(
      withGestureSlideOffset,
      trackLength,
      maxTrackIndex
    )
    const endHoleIndex = withSnapIndex + slideIndexSpan
    setLabelColumnBounds([withSnapIndex, endHoleIndex])
    slideOffsetAnimation.setValue(withGestureSlideOffset)
  }

  const onStateChange = ({
    nativeEvent: { translationY, state },
  }: PanGestureHandlerGestureEvent) => {
    const END_GESTURE = 5
    if (state !== END_GESTURE) return
    const withGestureSlideOffset = getWithGestureOffset(
      slideOffsetLength,
      translationY,
      slideLength,
      trackLength
    )
    const { withSnapIndex } = getWithSnapProps(
      withGestureSlideOffset,
      trackLength,
      maxTrackIndex
    )
    const endHoleIndex = withSnapIndex + slideIndexSpan
    setSlideColumnBounds([withSnapIndex, endHoleIndex] as readonly [
      number,
      number
    ])
    const nextColumnBounds = [withSnapIndex, endHoleIndex] as ColumnBounds
    setSourceColumnBounds(nextColumnBounds)
  }

  return {
    onGesture,
    onStateChange,
  }
}
