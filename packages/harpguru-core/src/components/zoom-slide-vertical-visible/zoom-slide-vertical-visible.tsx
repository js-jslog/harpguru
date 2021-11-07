import { useEffect, useGlobal } from 'reactn'
import Animated, { Value } from 'react-native-reanimated'
import { PanGestureHandler } from 'react-native-gesture-handler'
import { StyleSheet } from 'react-native'
import React, { useState, useRef } from 'react'

import { ZoomSlideLabels } from '../zoom-slide-labels'
import { getColors } from '../../utils'
import { getWindowDimensions } from '../../packages/get-window-dimensions'
import { useSizes } from '../../hooks'

import { getWithSnapProps, getGestureHandlerCallbacks } from './utils'

type ZoomSlideVerticalVisibleProps = {
  readonly restrictingColumnBounds: readonly [number, number]
  readonly totalHoles: number
}
export const ZoomSlideVerticalVisible = (
  props: ZoomSlideVerticalVisibleProps
): React.ReactElement => {
  const { restrictingColumnBounds, totalHoles } = props
  const slotCount = totalHoles - 1
  const { shortEdge: trackLength } = getWindowDimensions()
  const slotSize = trackLength / slotCount

  const { dynamicSizes } = useSizes()
  const { inertOutline } = getColors()

  const [slideOffset, setSlideOffset] = useState<number>(0)
  const [, setSourceColumnBounds] = useGlobal('sourceColumnBounds')
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  const labelStateSetterRef = useRef<(arg0: number) => void>(() => {})
  const [startSlot, endSlot] = restrictingColumnBounds
  const slideSpan = endSlot - startSlot
  const slideLength = slotSize * slideSpan
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

  const slideOffsetAnimation = new Value<number>(slideOffset)

  useEffect(() => {
    const { withSnapIndex } = getWithSnapProps(
      slideOffset,
      trackLength,
      slotCount
    )

    labelStateSetterRef.current(withSnapIndex)
  }, [])

  const { onGesture, onStateChange } = getGestureHandlerCallbacks(
    slideOffset,
    slideLength,
    trackLength,
    slideSpan,
    slotCount,
    slideOffsetAnimation,
    labelStateSetterRef.current,
    setSlideOffset,
    setSourceColumnBounds
  )

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
