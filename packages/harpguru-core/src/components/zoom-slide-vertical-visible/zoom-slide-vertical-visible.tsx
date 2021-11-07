import { useGlobal } from 'reactn'
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

  const [slideOffset, setSlideOffset] = useState<number>(0)
  const labelStateSetterRef = useLabelStateSetterRef(
    slideOffset,
    trackLength,
    slotCount
  )

  const slideOffsetAnimation = new Value<number>(slideOffset)
  const [, setSourceColumnBounds] = useGlobal('sourceColumnBounds')
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
