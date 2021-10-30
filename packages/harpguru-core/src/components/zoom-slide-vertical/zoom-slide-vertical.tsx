import VerticalSlider from 'rn-vertical-slider'
import { useGlobal } from 'reactn'
import { StyleSheet, View, Text } from 'react-native'
import React, { useState } from 'react'

import { getColors } from '../../utils'
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
const ZoomSlideVerticalVisible = ({
  restrictingColumnBounds: columnBounds,
  totalHoles,
}: ZoomSlideVerticalVisibleProps): React.ReactElement => {
  const { dynamicSizes } = useSizes()
  const { inertOutline, harpguruPink, pageColor } = getColors()
  const [, setSourceColumnBounds] = useGlobal('sourceColumnBounds')
  const [sliderBounds, setSliderBounds] = useState(columnBounds)
  const styles = StyleSheet.create({
    componentWrapper: {
      ...StyleSheet.absoluteFillObject,
      width: dynamicSizes.zoomSlideWidth,
      left: dynamicSizes['9'], // legend width is going to have to become a named variable
      flexDirection: 'column',
    },
    columnBoundsLabelWrapper: {
      backgroundColor: inertOutline,
      justifyContent: 'center',
      alignItems: 'center',
      flex: 1,
    },
    columnBoundsLabel: {
      fontSize: dynamicSizes['9'],
      color: pageColor,
    },
    sliderWrapper: {
      flex: 5,
      justifyContent: 'center',
      alignItems: 'center',
    },
    bottomLabelWrapper: {
      backgroundColor: 'red',
      flex: 1,
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
          value={sliderBounds[0] + 1}
          disabled={false}
          min={1}
          max={totalHoles - diff}
          onChange={onChange}
          onComplete={onComplete}
          width={dynamicSizes[6]}
          height={dynamicSizes.rowHeight * 3}
          step={1}
          borderRadius={5}
          minimumTrackTintColor={harpguruPink}
          maximumTrackTintColor={inertOutline}
        />
      </View>
      <View style={styles.columnBoundsLabelWrapper}>
        <Text style={styles.columnBoundsLabel}>{sliderBounds[0] + 1}</Text>
      </View>
    </View>
  )
}
