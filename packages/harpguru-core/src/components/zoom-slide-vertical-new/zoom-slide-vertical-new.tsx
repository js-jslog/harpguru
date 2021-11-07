import 'react-native-gesture-handler'

import { useEffect, useGlobal } from 'reactn'
import Animated, { Value } from 'react-native-reanimated'
import { PanGestureHandler } from 'react-native-gesture-handler'
import type { PanGestureHandlerGestureEvent } from 'react-native-gesture-handler'
import { StyleSheet, View, Text } from 'react-native'
import React, { useState, useRef, MutableRefObject } from 'react'

import { getColors } from '../../utils'
import type { ColumnBounds } from '../../types'
import { getWindowDimensions } from '../../packages/get-window-dimensions'
import { doSparceIdedObjectMatricesMatch } from '../../packages/do-sparce-ided-object-matrices-match'
import { useSizes } from '../../hooks'

import { getWithGestureOffset, getWithSnapProps } from './utils'

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

type ZoomSlideVerticalVisibleProps = {
  readonly restrictingColumnBounds: readonly [number, number]
  readonly totalHoles: number
}
const ZoomSlideVerticalVisible = (
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

  const onGesture = ({
    nativeEvent: { translationY },
  }: PanGestureHandlerGestureEvent) => {
    const withGestureSlideOffset = getWithGestureOffset(
      slideOffset,
      translationY,
      slideHeight,
      shortEdge
    )
    const { withSnapIndex } = getWithSnapProps(
      withGestureSlideOffset,
      shortEdge,
      slotCount
    )
    setSlotIndexInStartLabel.current(withSnapIndex)
    setSlotIndexInEndLabel.current(withSnapIndex)
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
      slideHeight,
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

    setSlotIndexInStartLabel.current(withSnapIndex)
    setSlotIndexInEndLabel.current(withSnapIndex)
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
