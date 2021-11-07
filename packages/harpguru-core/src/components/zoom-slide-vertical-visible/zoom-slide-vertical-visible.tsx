import { useEffect, useGlobal } from 'reactn'
import Animated, { Value } from 'react-native-reanimated'
import { PanGestureHandler } from 'react-native-gesture-handler'
import type { PanGestureHandlerGestureEvent } from 'react-native-gesture-handler'
import { StyleSheet } from 'react-native'
import React, { useState, useRef } from 'react'

import { ZoomSlideLabels } from '../zoom-slide-labels'
import { getColors } from '../../utils'
import type { ColumnBounds } from '../../types'
import { getWindowDimensions } from '../../packages/get-window-dimensions'
import { useSizes } from '../../hooks'

import { getWithGestureOffset, getWithSnapProps } from './utils'

type ZoomSlideVerticalVisibleProps = {
  readonly restrictingColumnBounds: readonly [number, number]
  readonly totalHoles: number
}
export const ZoomSlideVerticalVisible = (
  props: ZoomSlideVerticalVisibleProps
): React.ReactElement => {
  // Get sizes
  // Setup animation value
  // Create refs for labels
  // On gesture
  //  - evaluate offset & set animation
  //  - evaluate index from offset & set label refs
  // On statechange
  //  - evaluate offset, evaluate index, evaluate snapoffset
  //  - set slideoffset & animation value
  const { restrictingColumnBounds, totalHoles } = props
  const slotCount = totalHoles - 1
  const { shortEdge } = getWindowDimensions()
  const slotSize = shortEdge / slotCount

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

  const onGesture = ({
    nativeEvent: { translationY },
  }: PanGestureHandlerGestureEvent) => {
    const withGestureSlideOffset = getWithGestureOffset(
      slideOffset,
      translationY,
      slideLength,
      shortEdge
    )
    const { withSnapIndex } = getWithSnapProps(
      withGestureSlideOffset,
      shortEdge,
      slotCount
    )
    labelStateSetterRef.current(withSnapIndex)
    return slideOffsetAnimation.setValue(withGestureSlideOffset)
  }

  const onStateChange = ({
    nativeEvent: { translationY, state },
  }: PanGestureHandlerGestureEvent) => {
    const END_GESTURE = 5
    if (state !== END_GESTURE) return
    const withGestureSlideOffset = getWithGestureOffset(
      slideOffset,
      translationY,
      slideLength,
      shortEdge
    )
    const { withSnapOffset, withSnapIndex: startHoleIndex } = getWithSnapProps(
      withGestureSlideOffset,
      shortEdge,
      slotCount
    )
    setSlideOffset(withSnapOffset)
    const endHoleIndex = startHoleIndex + slideSpan
    const nextColumnBounds = [startHoleIndex, endHoleIndex] as ColumnBounds
    setSourceColumnBounds(nextColumnBounds)
  }

  useEffect(() => {
    const { withSnapIndex } = getWithSnapProps(
      slideOffset,
      shortEdge,
      slotCount
    )

    labelStateSetterRef.current(withSnapIndex)
  }, [])

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
