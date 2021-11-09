import { useGlobal } from 'reactn'
import Animated from 'react-native-reanimated'
import { PanGestureHandler } from 'react-native-gesture-handler'
import { StyleSheet } from 'react-native'
import React from 'react'

import { ZoomSlideLabels } from '../zoom-slide-labels'
import { getColors } from '../../utils'
import { useSizes } from '../../hooks'

import { getGestureHandlerCallbacks, getSlideFacts } from './utils'
import { useSlideState } from './hooks'

type ZoomSlideVerticalVisibleProps = {
  readonly columnBounds: readonly [number, number]
  readonly columnCount: number
}
export const ZoomSlideVerticalVisible = (
  props: ZoomSlideVerticalVisibleProps
): React.ReactElement => {
  const { columnBounds, columnCount } = props

  const {
    trackBounds,
    setTrackBounds,
    labelStateSetterRef,
    slideOffsetAnimation,
  } = useSlideState(columnBounds, columnCount)

  const [, setSourceColumnBounds] = useGlobal('sourceColumnBounds')
  const { onGesture, onStateChange } = getGestureHandlerCallbacks(
    trackBounds,
    columnCount,
    slideOffsetAnimation,
    labelStateSetterRef.current,
    setTrackBounds,
    setSourceColumnBounds
  )

  const { dynamicSizes } = useSizes()
  const { inertOutline } = getColors()
  const { slideLength } = getSlideFacts(trackBounds, columnCount)
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
        <ZoomSlideLabels stateSetterRef={labelStateSetterRef} />
      </Animated.View>
    </PanGestureHandler>
  )
}
