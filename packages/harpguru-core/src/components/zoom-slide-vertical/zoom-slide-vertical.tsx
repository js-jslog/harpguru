import { useGlobal } from 'reactn'
import { StyleSheet, View, Text } from 'react-native'
import React, { useState } from 'react'
import MultiSlider from '@ptomasroos/react-native-multi-slider'

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
  const [, setSourceColumnBounds] = useGlobal('sourceColumnBounds')
  const [sliderBounds, setSliderBounds] = useState(columnBounds)
  const styles = StyleSheet.create({
    componentWrapper: {
      ...StyleSheet.absoluteFillObject,
      width: dynamicSizes.zoomSlideWidth,
      backgroundColor: 'green',
      left: dynamicSizes['9'], // legend width is going to have to become a named variable
      flexDirection: 'column',
    },
    topLabelWrapper: {
      backgroundColor: 'red',
      flex: 1,
    },
    sliderWrapper: {
      backgroundColor: 'yellow',
      flex: 5,
      justifyContent: 'center',
    },
    bottomLabelWrapper: {
      backgroundColor: 'red',
      flex: 1,
    },
    track: {
      backgroundColor: 'black',
    },
    marker: {
      backgroundColor: 'black',
    },
    selectedd: {
      backgroundColor: 'black',
    },
  })

  const [start, end] = sliderBounds
  const diff = end - start

  const onValuesChangeFinish = (values: number[]) => {
    const startHole = values[0] - 1
    const endHole = startHole + diff
    setSourceColumnBounds([startHole, endHole])
  }
  const onValuesChange = (values: number[]) => {
    const startHole = values[0] - 1
    const endHole = startHole + diff
    setSliderBounds([startHole, endHole])
  }

  return (
    <View style={styles.componentWrapper}>
      <View style={styles.topLabelWrapper}>
        <Text>{sliderBounds[0] + 1}</Text>
      </View>
      <View style={styles.sliderWrapper}>
        <MultiSlider
          vertical={true}
          values={[sliderBounds[0] + 1]}
          min={1}
          max={totalHoles - diff}
          snapped={true}
          sliderLength={150}
          onValuesChangeFinish={onValuesChangeFinish}
          onValuesChange={onValuesChange}
          trackStyle={styles.track}
          markerStyle={styles.marker}
          selectedStyle={styles.selectedd}
        />
      </View>
      <View style={styles.bottomLabelWrapper}>
        <Text>{sliderBounds[1] + 1}</Text>
      </View>
    </View>
  )
}
