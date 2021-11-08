import { useEffect, useGlobal } from 'reactn'
import Animated, { Value } from 'react-native-reanimated'
import { PanGestureHandler } from 'react-native-gesture-handler'
import { StyleSheet } from 'react-native'
import React, { useState } from 'react'

import { ZoomSlideLabels } from '../zoom-slide-labels'
import { getColors } from '../../utils'
import { useSizes } from '../../hooks'

import { getGestureHandlerCallbacks, getSlideFacts } from './utils'
import { useLabelStateSetterRef } from './hooks'

type ZoomSlideVerticalVisibleProps = {
  readonly columnBounds: readonly [number, number]
  readonly columnCount: number
}
export const ZoomSlideVerticalVisible = (
  props: ZoomSlideVerticalVisibleProps
): React.ReactElement => {
  const { columnBounds, columnCount } = props
  const { [0]: inputBoundsStart } = columnBounds
  const columnBoundsSpan = columnBounds[1] - columnBounds[0]

  const [slotIndex, setSlotIndex] = useState<number>(inputBoundsStart)
  const { slideLength, slideHeadOffset, slideSpan } = getSlideFacts(
    [slotIndex, slotIndex + columnBoundsSpan],
    columnCount
  )
  const labelStateSetterRef = useLabelStateSetterRef(slotIndex)

  const slideOffsetAnimation = new Value<number>(slideHeadOffset)
  const [, setSourceColumnBounds] = useGlobal('sourceColumnBounds')
  const { onGesture, onStateChange } = getGestureHandlerCallbacks(
    [slotIndex, slotIndex + columnBoundsSpan],
    columnCount,
    slideOffsetAnimation,
    labelStateSetterRef.current,
    setSlotIndex,
    setSourceColumnBounds
  )

  useEffect(() => {
    if (slotIndex !== inputBoundsStart) {
      setSlotIndex(inputBoundsStart)
      labelStateSetterRef.current(inputBoundsStart)
    }
  }, [slotIndex, inputBoundsStart, setSlotIndex, labelStateSetterRef])

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
