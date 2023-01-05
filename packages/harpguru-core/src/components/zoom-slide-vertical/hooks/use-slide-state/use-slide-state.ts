import { Value } from 'react-native-reanimated'
import { useState, useEffect } from 'react'
import type { MutableRefObject } from 'react'

import { useLabelStateSetterRef } from '../use-label-state-setter-ref'
import { getSlideFacts } from '../../utils'
import { isMatchColumnBounds } from '../../../../utils'

type SlideStateObjects = {
  readonly trackBounds: readonly [number, number]
  readonly setTrackBounds: (arg0: readonly [number, number]) => void
  readonly labelStateSetterRef: MutableRefObject<
    (arg0: readonly [number, number]) => void
  >
  readonly slideOffsetAnimation: Value<number>
}
export const useSlideState = (
  columnBounds: readonly [number, number],
  columnCount: number
): SlideStateObjects => {
  const [trackBounds, setTrackBounds] =
    useState<readonly [number, number]>(columnBounds)
  const labelStateSetterRef = useLabelStateSetterRef(trackBounds)
  const { slideOffsetLength } = getSlideFacts(trackBounds, columnCount)
  const slideOffsetAnimation = new Value<number>(slideOffsetLength)

  // This effect makes sure that when the columnBounds are updated
  // by other elements of the app, that the trackBounds are updated
  // to reflect the change.
  useEffect(() => {
    if (!isMatchColumnBounds(trackBounds, columnBounds)) {
      setTrackBounds(columnBounds)
      labelStateSetterRef.current(columnBounds)
    }
  }, [trackBounds, columnBounds, setTrackBounds, labelStateSetterRef])

  return {
    trackBounds,
    setTrackBounds,
    labelStateSetterRef,
    slideOffsetAnimation,
  }
}
