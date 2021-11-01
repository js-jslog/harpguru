import 'react-native-gesture-handler'

import { useEffect, useGlobal } from 'reactn'
import Animated, { Value } from 'react-native-reanimated'
import { PanGestureHandler } from 'react-native-gesture-handler'
import type { PanGestureHandlerGestureEvent } from 'react-native-gesture-handler'
import { StyleSheet, View, Text } from 'react-native'
import React, { useState, useRef, MutableRefObject } from 'react'

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

const interpolateToSlotIndex = (
  slideOffset: number,
  trackHeight: number,
  slotCount: number
): number => {
  const slotSize = trackHeight / slotCount
  const decimalInterpolation = slideOffset / slotSize
  return Math.round(decimalInterpolation) + 1
}

const projectToSlideOffset = (
  holeIndex: number,
  trackHeight: number,
  slotCount: number
) => {
  const slotSize = trackHeight / (slotCount - 1)
  const slideOffset = (holeIndex - 1) * slotSize
  return slideOffset
}

type ZoomSlideVerticalVisibleProps = {
  readonly restrictingColumnBounds: readonly [number, number]
  readonly totalHoles: number
}
const ZoomSlideVerticalVisible = (
  props: ZoomSlideVerticalVisibleProps
): React.ReactElement => {
  const { restrictingColumnBounds, totalHoles } = props
  const slotCount = totalHoles - 1
  const { shortEdge } = getWindowDimensions()
  const slotSize = shortEdge / slotCount

  const { dynamicSizes } = useSizes()
  const { inertOutline } = getColors()

  const [slideOffset, setSlideOffset] = useState<number>(0)
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  const setLabelState = useRef<(arg0: number) => void>(() => {})
  const [startSlot, endSlot] = restrictingColumnBounds
  const slideSpan = endSlot - startSlot
  const slideHeight = slotSize * slideSpan
  const styles = StyleSheet.create({
    componentWrapper: {
      ...StyleSheet.absoluteFillObject,
      width: dynamicSizes.zoomSlideWidth,
      left: dynamicSizes['9'], // legend width is going to have to become a named variable
    },
    sliderWrapper: {
      backgroundColor: inertOutline,
      width: dynamicSizes.zoomSlideWidth,
      height: slideHeight,
    },
  })

  const slideOffsetAnimation = new Value<number>(slideOffset)

  const snapSlideToSlot = (nextSlideOffset: number) => {
    const holeNumber = interpolateToSlotIndex(
      nextSlideOffset,
      shortEdge,
      totalHoles
    )
    const snappedSlideOffset = projectToSlideOffset(
      holeNumber,
      shortEdge,
      totalHoles
    )
    setSlideOffset(snappedSlideOffset)
    return slideOffsetAnimation.setValue(snappedSlideOffset)
  }
  const onGesture = ({
    nativeEvent: { translationY },
  }: PanGestureHandlerGestureEvent) => {
    if (slideOffset + translationY <= 0) {
      setLabelState.current(interpolateToSlotIndex(0, shortEdge, totalHoles))
      return slideOffsetAnimation.setValue(0)
    }
    if (slideOffset + slideHeight + translationY >= shortEdge) {
      setLabelState.current(
        interpolateToSlotIndex(shortEdge - slideHeight, shortEdge, totalHoles)
      )
      return slideOffsetAnimation.setValue(shortEdge - slideHeight)
    }
    setLabelState.current(
      interpolateToSlotIndex(slideOffset + translationY, shortEdge, totalHoles)
    )
    return slideOffsetAnimation.setValue(slideOffset + translationY)
  }
  const onStateChange = ({
    nativeEvent: { translationY, state },
  }: PanGestureHandlerGestureEvent) => {
    const END_GESTURE = 5
    if (state === END_GESTURE) {
      if (slideOffset + translationY <= 0) return snapSlideToSlot(0)
      if (slideOffset + slideHeight + translationY >= shortEdge)
        return snapSlideToSlot(shortEdge - slideHeight)
      return snapSlideToSlot(slideOffset + translationY)
    }
  }

  useEffect(() => {
    setLabelState.current(
      interpolateToSlotIndex(slideOffset, shortEdge, totalHoles)
    )
  }, [])

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
              transform: [{ translateY: slideOffsetAnimation }],
            },
          ]}
        >
          <IndicatorLabel setLabelState={setLabelState} />
        </Animated.View>
      </View>
    </PanGestureHandler>
  )
}

type IndicatorLabelProps = {
  readonly setLabelState: MutableRefObject<(arg0: number) => void>
}
const IndicatorLabel = ({ setLabelState }: IndicatorLabelProps) => {
  const { dynamicSizes } = useSizes()
  const { pageColor } = getColors()
  const styles = StyleSheet.create({
    textStyle: {
      color: pageColor,
      fontSize: dynamicSizes['8'],
      alignSelf: 'center',
    },
  })
  const [label, setLabel] = useState(2)
  setLabelState.current = (label: number) => setLabel(label)
  return <Text style={styles.textStyle}>{label}</Text>
}
