import { useGlobal } from 'reactn'
import { StyleSheet, View, Text } from 'react-native'
import React from 'react'
import MultiSlider from '@ptomasroos/react-native-multi-slider'

import { useSizes } from '../../hooks'

export const ZoomSlideVertical = (): React.ReactElement => {
  const { dynamicSizes } = useSizes()
  const [, setSourceColumnBounds] = useGlobal('sourceColumnBounds')
  const [columnBounds] = useGlobal('columnBounds')
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

  if (columnBounds === 'FIT') return <View style={styles.componentWrapper} />

  const [start, end] = columnBounds
  const diff = end - start

  const onValuesChangeFinish = (values: number[]) => {
    const startHole = values[0] - 1
    const endHole = startHole + diff
    setSourceColumnBounds([startHole, endHole])
  }

  return (
    <View style={styles.componentWrapper}>
      <View style={styles.topLabelWrapper}>
        <Text>{columnBounds[0]}</Text>
      </View>
      <View style={styles.sliderWrapper}>
        <MultiSlider
          vertical={true}
          values={[1]}
          min={1}
          max={7}
          snapped={true}
          sliderLength={150}
          onValuesChangeFinish={onValuesChangeFinish}
          trackStyle={styles.track}
          markerStyle={styles.marker}
          selectedStyle={styles.selectedd}
        />
      </View>
      <View style={styles.bottomLabelWrapper}>
        <Text>{columnBounds[1]}</Text>
      </View>
    </View>
  )
}
