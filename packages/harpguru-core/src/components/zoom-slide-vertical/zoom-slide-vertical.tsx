import { useGlobal } from 'reactn'
import { StyleSheet, View, Text } from 'react-native'
import React, { useState } from 'react'
import MultiSlider from '@ptomasroos/react-native-multi-slider'

import { useSizes } from '../../hooks'

export const ZoomSlideVertical = (): React.ReactElement => {
  const { dynamicSizes } = useSizes()
  const [, setSourceColumnBounds] = useGlobal('sourceColumnBounds')
  const [globalDisplayColumnBounds] = useGlobal('columnBounds')
  // This local version of columnBounds is required because it needs to be
  // updated without producing the application wide rerendering which updating
  // either `columnBounds` or `sourceColumnBounds` would.
  // In addition, it's necessary to drive this local version of column bounds
  // by the `columnBounds` rather than the `sourceColumnBounds` because we must
  // never drive renders by the "source" global variables but we must always
  // update "source" global variables rather than their non-source counterparts.
  // See callback-on-sourceglobalprops for details.
  const [localColumnBounds, setLocalColumnBounds] = useState(
    globalDisplayColumnBounds
  )
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

  if (localColumnBounds === 'FIT')
    return <View style={styles.componentWrapper} />

  const [start, end] = localColumnBounds
  const diff = end - start

  const onValuesChangeFinish = (values: number[]) => {
    const startHole = values[0] - 1
    const endHole = startHole + diff
    setSourceColumnBounds([startHole, endHole])
  }
  const onValuesChange = (values: number[]) => {
    const startHole = values[0] - 1
    const endHole = startHole + diff
    setLocalColumnBounds([startHole, endHole])
  }

  return (
    <View style={styles.componentWrapper}>
      <View style={styles.topLabelWrapper}>
        <Text>{localColumnBounds[0] + 1}</Text>
      </View>
      <View style={styles.sliderWrapper}>
        <MultiSlider
          vertical={true}
          values={[localColumnBounds[0] + 1]}
          min={1}
          max={7}
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
        <Text>{localColumnBounds[1] + 1}</Text>
      </View>
    </View>
  )
}
