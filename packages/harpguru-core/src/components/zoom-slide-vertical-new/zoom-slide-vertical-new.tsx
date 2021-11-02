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
  return Math.round(decimalInterpolation)
}

const projectToSlideOffset = (
  holeIndex: number,
  trackHeight: number,
  slotCount: number
) => {
  const slotSize = trackHeight / slotCount
  const slideOffset = holeIndex * slotSize
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
  const setSlotIndexInStartLabel = useRef<(arg0: number) => void>(() => {})
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  const setSlotIndexInEndLabel = useRef<(arg0: number) => void>(() => {})
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
      justifyContent: 'space-between',
    },
  })

  const slideOffsetAnimation = new Value<number>(slideOffset)

  const snapSlideToSlot = (nextSlideOffset: number) => {
    const holeNumber = interpolateToSlotIndex(
      nextSlideOffset,
      shortEdge,
      slotCount
    )
    const snappedSlideOffset = projectToSlideOffset(
      holeNumber,
      shortEdge,
      slotCount
    )
    setSlideOffset(snappedSlideOffset)
    return slideOffsetAnimation.setValue(snappedSlideOffset)
  }
  const onGesture = ({
    nativeEvent: { translationY },
  }: PanGestureHandlerGestureEvent) => {
    const isPastTop = slideOffset + translationY <= 0
    const topOffset = 0
    const topSlotIndex = interpolateToSlotIndex(0, shortEdge, slotCount)
    if (isPastTop) {
      setSlotIndexInStartLabel.current(topSlotIndex)
      setSlotIndexInEndLabel.current(topSlotIndex)
      return slideOffsetAnimation.setValue(topOffset)
    }
    const isPastBottom = slideOffset + slideHeight + translationY >= shortEdge
    const bottomOffset = shortEdge - slideHeight
    const bottomSlotIndex = interpolateToSlotIndex(
      bottomOffset,
      shortEdge,
      slotCount
    )
    if (isPastBottom) {
      setSlotIndexInStartLabel.current(bottomSlotIndex)
      setSlotIndexInEndLabel.current(bottomSlotIndex)
      return slideOffsetAnimation.setValue(bottomOffset)
    }
    const nextOffset = slideOffset + translationY
    const nextSlotIndex = interpolateToSlotIndex(
      nextOffset,
      shortEdge,
      slotCount
    )
    setSlotIndexInStartLabel.current(nextSlotIndex)
    setSlotIndexInEndLabel.current(nextSlotIndex)
    return slideOffsetAnimation.setValue(nextOffset)
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
    setSlotIndexInStartLabel.current(
      interpolateToSlotIndex(slideOffset, shortEdge, slotCount)
    )
    setSlotIndexInEndLabel.current(
      interpolateToSlotIndex(slideOffset, shortEdge, slotCount)
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
          <IndicatorLabel
            setLabelIndex={setSlotIndexInStartLabel}
            zeroIndex={1}
          />
          <IndicatorLabel
            setLabelIndex={setSlotIndexInEndLabel}
            zeroIndex={slideSpan + 1}
          />
        </Animated.View>
      </View>
    </PanGestureHandler>
  )
}

type IndicatorLabelProps = {
  readonly setLabelIndex: MutableRefObject<(arg0: number) => void>
  readonly zeroIndex: number
}
const IndicatorLabel = ({ setLabelIndex, zeroIndex }: IndicatorLabelProps) => {
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
  setLabelIndex.current = (label: number) => setLabel(label)
  return <Text style={styles.textStyle}>{label + zeroIndex}</Text>
}
