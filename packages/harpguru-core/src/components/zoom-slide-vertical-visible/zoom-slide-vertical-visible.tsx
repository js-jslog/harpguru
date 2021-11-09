import { useEffect, useGlobal } from 'reactn'
import Animated, { Value } from 'react-native-reanimated'
import { PanGestureHandler } from 'react-native-gesture-handler'
import { StyleSheet } from 'react-native'
import React, { useState } from 'react'

import { ZoomSlideLabels } from '../zoom-slide-labels'
import { getColors, isMatchColumnBounds } from '../../utils'
import { useSizes } from '../../hooks'

import { getGestureHandlerCallbacks, getSlideFacts } from './utils'
import { useLabelStateSetterRef } from './hooks'

type ZoomSlideVerticalVisibleProps = {
  readonly globalColumnBounds: readonly [number, number]
  readonly columnCount: number
}
export const ZoomSlideVerticalVisible = (
  props: ZoomSlideVerticalVisibleProps
): React.ReactElement => {
  const { globalColumnBounds, columnCount } = props

  const [localColumnBounds, setLocalColumnBounds] = useState<
    readonly [number, number]
  >(globalColumnBounds)
  const { slideLength, slideHeadOffset } = getSlideFacts(
    localColumnBounds,
    columnCount
  )
  const labelStateSetterRef = useLabelStateSetterRef(localColumnBounds)

  const slideOffsetAnimation = new Value<number>(slideHeadOffset)
  const [, setSourceColumnBounds] = useGlobal('sourceColumnBounds')
  const { onGesture, onStateChange } = getGestureHandlerCallbacks(
    localColumnBounds,
    columnCount,
    slideOffsetAnimation,
    labelStateSetterRef.current,
    setLocalColumnBounds,
    setSourceColumnBounds
  )

  useEffect(() => {
    if (!isMatchColumnBounds(localColumnBounds, globalColumnBounds)) {
      setLocalColumnBounds(globalColumnBounds)
      labelStateSetterRef.current(globalColumnBounds)
    }
  }, [
    localColumnBounds,
    globalColumnBounds,
    setLocalColumnBounds,
    labelStateSetterRef,
  ])

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
        <ZoomSlideLabels stateSetterRef={labelStateSetterRef} />
      </Animated.View>
    </PanGestureHandler>
  )
}
