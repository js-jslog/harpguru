import VerticalSlider from 'rn-vertical-slider'
import { useGlobal } from 'reactn'
import { StyleSheet, View, Text } from 'react-native'
import React, { useState } from 'react'

import { getColors } from '../../utils'
import { getWindowDimensions } from '../../packages/get-window-dimensions'
import { doSparceIdedObjectMatricesMatch } from '../../packages/do-sparce-ided-object-matrices-match'
import { useSizes } from '../../hooks'

export const ZoomSlideVertical = (): React.ReactElement => {
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
  const { restrictingColumnBounds: columnBounds, totalHoles } = props
  const { dynamicSizes } = useSizes()
  const { homeRowsColor, inertOutline, pageColor } = getColors()
  const [, setSourceColumnBounds] = useGlobal('sourceColumnBounds')
  const [sliderBounds, setSliderBounds] = useState(columnBounds)
  const styles = StyleSheet.create({
    componentWrapper: {
      ...StyleSheet.absoluteFillObject,
      width: dynamicSizes.zoomSlideWidth,
      left: dynamicSizes['9'], // legend width is going to have to become a named variable
      flexDirection: 'column',
      padding: dynamicSizes['7'],
      justifyContent: 'center',
      alignItems: 'center',
    },
    columnBoundsLabelWrapper: {
      backgroundColor: inertOutline,
      justifyContent: 'center',
      alignItems: 'center',
      width: dynamicSizes['8'] + dynamicSizes['5'],
      height: dynamicSizes['8'] + dynamicSizes['5'],
      borderRadius: dynamicSizes['6'],
      margin: dynamicSizes['5'],
    },
    columnBoundsLabel: {
      fontSize: dynamicSizes['8'],
      color: homeRowsColor,
    },
    sliderWrapper: {
      justifyContent: 'center',
      alignItems: 'center',
      zIndex: 0,
    },
  })

  const [start, end] = sliderBounds
  const diff = end - start

  const onComplete = (values: number) => {
    const startHole = values - 1
    const endHole = startHole + diff
    setSourceColumnBounds([startHole, endHole])
  }
  const onChange = (value: number) => {
    const startHole = value - 1
    const endHole = startHole + diff
    setSliderBounds([startHole, endHole])
  }

  return (
    <View style={styles.componentWrapper}>
      <View style={styles.columnBoundsLabelWrapper}>
        <Text style={styles.columnBoundsLabel}>{sliderBounds[1] + 1}</Text>
      </View>
      <View style={styles.sliderWrapper}>
        <VerticalSlider
          disabled={false}
          value={sliderBounds[0] + 1}
          step={1}
          min={1}
          max={totalHoles - diff}
          onChange={onChange}
          onComplete={onComplete}
          width={dynamicSizes['8'] + dynamicSizes['5']}
          height={dynamicSizes.rowHeight * 3}
          borderRadius={dynamicSizes['6']}
          minimumTrackTintColor={pageColor}
          maximumTrackTintColor={pageColor}
          renderIndicator={() => <ZoomSlideVerticalIndicator {...props} />}
          showBallIndicator={true}
          ballIndicatorHeight={dynamicSizes['5']}
          ballIndicatorWidth={dynamicSizes['8'] + dynamicSizes['5']}
          ballIndicatorPosition={0}
          showBackgroundShadow={false}
        />
      </View>
      <View style={styles.columnBoundsLabelWrapper}>
        <Text style={styles.columnBoundsLabel}>{sliderBounds[0] + 1}</Text>
      </View>
    </View>
  )
}

const ZoomSlideVerticalIndicator = ({
  restrictingColumnBounds: columnBounds,
  totalHoles,
}: ZoomSlideVerticalVisibleProps): React.ReactElement => {
  const { dynamicSizes } = useSizes()
  const { inertOutline } = getColors()
  const { shortEdge } = getWindowDimensions()
  const unitSize = shortEdge / totalHoles
  const [startHole, endHole] = columnBounds
  const holeSpan = endHole - startHole
  const indicatorHeight = unitSize * holeSpan
  const styles = StyleSheet.create({
    indicator: {
      backgroundColor: inertOutline,
      width: dynamicSizes['8'] + dynamicSizes['5'],
      height: indicatorHeight,
      bottom: indicatorHeight / 2,
    },
  })
  return <View style={styles.indicator} />
}