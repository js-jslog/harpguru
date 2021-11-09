import { useGlobal } from 'reactn'
import Animated from 'react-native-reanimated'
import { PanGestureHandler } from 'react-native-gesture-handler'
import React from 'react'

import { ZoomSlideLabels } from '../zoom-slide-labels'

import { getGestureHandlerCallbacks } from './utils'
import { useSlideState, useStyles } from './hooks'

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

  const slideStyle = useStyles(trackBounds, columnCount)

  return (
    <PanGestureHandler
      onGestureEvent={onGesture}
      onHandlerStateChange={onStateChange}
    >
      <Animated.View
        style={[
          slideStyle,
          { transform: [{ translateY: slideOffsetAnimation }] },
        ]}
      >
        <ZoomSlideLabels stateSetterRef={labelStateSetterRef} />
      </Animated.View>
    </PanGestureHandler>
  )
}
