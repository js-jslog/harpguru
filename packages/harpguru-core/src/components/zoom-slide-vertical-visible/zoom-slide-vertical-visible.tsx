import { useEffect, useGlobal } from 'reactn'
import Animated, { Value } from 'react-native-reanimated'
import { PanGestureHandler } from 'react-native-gesture-handler'
import { StyleSheet } from 'react-native'
import React, { useState } from 'react'

import { ZoomSlideLabels } from '../zoom-slide-labels'
import { getColors } from '../../utils'
import { useSizes } from '../../hooks'

import {
  getGestureHandlerCallbacks,
  getSlideFacts,
  getFromIndexOffset,
} from './utils'
import { useLabelStateSetterRef } from './hooks'

type ZoomSlideVerticalVisibleProps = {
  readonly restrictingColumnBounds: readonly [number, number]
  readonly totalHoles: number
}
export const ZoomSlideVerticalVisible = (
  props: ZoomSlideVerticalVisibleProps
): React.ReactElement => {
  const { restrictingColumnBounds, totalHoles } = props
  const { trackLength, slideLength, slideSpan, slotCount } = getSlideFacts(
    restrictingColumnBounds,
    totalHoles
  )
  const { [0]: initialSlotIndex } = restrictingColumnBounds

  const { dynamicSizes } = useSizes()
  const { inertOutline } = getColors()
  const styles = StyleSheet.create({
    componentWrapper: {
      ...StyleSheet.absoluteFillObject,
      width: dynamicSizes.zoomSlideWidth,
      left: dynamicSizes['9'], // legend width is going to have to become a named variable
      height: slideLength,
      backgroundColor: inertOutline,
      flexDirection: 'column',
      justifyContent: 'space-between',
    },
  })

  const [slotIndex, setSlotIndex] = useState<number>(initialSlotIndex)
  const labelStateSetterRef = useLabelStateSetterRef(slotIndex)

  const slideOffset = getFromIndexOffset(slotIndex, trackLength, slotCount)
  const slideOffsetAnimation = new Value<number>(slideOffset)
  const [, setSourceColumnBounds] = useGlobal('sourceColumnBounds')
  const { onGesture, onStateChange } = getGestureHandlerCallbacks(
    slotIndex,
    slideLength,
    trackLength,
    slideSpan,
    slotCount,
    slideOffsetAnimation,
    labelStateSetterRef.current,
    setSlotIndex,
    setSourceColumnBounds
  )

  useEffect(() => {
    if (slotIndex !== initialSlotIndex) {
      setSlotIndex(initialSlotIndex)
      labelStateSetterRef.current(initialSlotIndex)
    }
  }, [slotIndex, initialSlotIndex, setSlotIndex, labelStateSetterRef])

  return (
    <PanGestureHandler
      onGestureEvent={onGesture}
      onHandlerStateChange={onStateChange}
    >
      <Animated.View
        style={[
          styles.componentWrapper,
          { transform: [{ translateY: slideOffsetAnimation }] },
        ]}
      >
        <ZoomSlideLabels
          stateSetterRef={labelStateSetterRef}
          slideSpan={slideSpan}
        />
      </Animated.View>
    </PanGestureHandler>
  )
}
