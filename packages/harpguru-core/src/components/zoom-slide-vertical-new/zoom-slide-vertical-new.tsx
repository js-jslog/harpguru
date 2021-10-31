import 'react-native-gesture-handler'

import { useGlobal } from 'reactn'
import Animated, { Value } from 'react-native-reanimated'
import { PanGestureHandler } from 'react-native-gesture-handler'
import type { PanGestureHandlerGestureEvent } from 'react-native-gesture-handler'
import { StyleSheet, View } from 'react-native'
import React, { useState } from 'react'

import { getColors } from '../../utils'
import { getWindowDimensions } from '../../packages/get-window-dimensions'
import { doSparceIdedObjectMatricesMatch } from '../../packages/do-sparce-ided-object-matrices-match'
import { useSizes } from '../../hooks'

export const ZoomSlideVerticalNew = (): React.ReactElement => {
  const [columnBounds] = useGlobal('columnBounds')
  const [fullInteractionMatrix] = useGlobal('activeInteractionMatrix')
  const [viewableInteractionMatrix] = useGlobal('viewableInteractionMatrix')
  if (columnBounds === 'FIT') return <></>
  if (
    doSparceIdedObjectMatricesMatch(
      fullInteractionMatrix,
      viewableInteractionMatrix
    )
  )
    return <></>

  return (
    <ZoomSlideVerticalVisible
      restrictingColumnBounds={columnBounds}
      totalHoles={fullInteractionMatrix[0].length}
    />
  )
}

const interpolateToHoleIndex = (
  slideOffset: number,
  totalHeight: number,
  totalHoles: number
): number => {
  const unitSize = totalHeight / totalHoles
  const interHoleIndex = slideOffset / unitSize
  return Math.round(interHoleIndex)
}

const projectToSlideOffset = (
  holeIndex: number,
  totalHeight: number,
  totalHoles: number
) => {
  const unitSize = totalHeight / totalHoles
  const slideOffset = holeIndex * unitSize
  return slideOffset
}

type ZoomSlideVerticalVisibleProps = {
  readonly restrictingColumnBounds: readonly [number, number]
  readonly totalHoles: number
}
const ZoomSlideVerticalVisible = (
  props: ZoomSlideVerticalVisibleProps
): React.ReactElement => {
  const { restrictingColumnBounds: columnBounds, totalHoles } = props
  const [sliderTopOffset, setSliderTopOffset] = useState<number>(10)
  const { dynamicSizes } = useSizes()
  const { inertOutline } = getColors()
  const { shortEdge } = getWindowDimensions()
  const unitSize = shortEdge / totalHoles
  const [startHole, endHole] = columnBounds
  const holeSpan = endHole - startHole
  const indicatorHeight = unitSize * holeSpan
  const styles = StyleSheet.create({
    componentWrapper: {
      ...StyleSheet.absoluteFillObject,
      width: dynamicSizes.zoomSlideWidth,
      left: dynamicSizes['9'], // legend width is going to have to become a named variable
    },
    sliderWrapper: {
      backgroundColor: inertOutline,
      width: dynamicSizes.zoomSlideWidth,
      height: indicatorHeight,
    },
  })

  const sliderYAnimation = new Value<number>(sliderTopOffset)

  const snapToHoleIndex = (nextSlideOffset: number) => {
    const holeNumber = interpolateToHoleIndex(
      nextSlideOffset,
      shortEdge,
      totalHoles
    )
    const snappedSlideOffset = projectToSlideOffset(
      holeNumber,
      shortEdge,
      totalHoles
    )
    setSliderTopOffset(snappedSlideOffset)
    return sliderYAnimation.setValue(snappedSlideOffset)
  }
  const onGesture = ({ nativeEvent }: PanGestureHandlerGestureEvent) => {
    if (sliderTopOffset + nativeEvent.translationY <= 0)
      return sliderYAnimation.setValue(0)
    if (
      sliderTopOffset + indicatorHeight + nativeEvent.translationY >=
      shortEdge
    )
      return sliderYAnimation.setValue(shortEdge - indicatorHeight)
    return sliderYAnimation.setValue(sliderTopOffset + nativeEvent.translationY)
  }
  const onStateChange = ({ nativeEvent }: PanGestureHandlerGestureEvent) => {
    if (nativeEvent.state === 5) {
      if (sliderTopOffset + nativeEvent.translationY <= 0)
        return snapToHoleIndex(0)
      if (
        sliderTopOffset + indicatorHeight + nativeEvent.translationY >=
        shortEdge
      )
        return snapToHoleIndex(shortEdge - indicatorHeight)
      return snapToHoleIndex(sliderTopOffset + nativeEvent.translationY)
    }
  }

  return (
    <PanGestureHandler
      onGestureEvent={onGesture}
      onHandlerStateChange={onStateChange}
    >
      <View style={styles.componentWrapper}>
        <Animated.View
          style={[
            styles.sliderWrapper,
            {
              transform: [{ translateY: sliderYAnimation }],
            },
          ]}
        />
      </View>
    </PanGestureHandler>
  )
}
