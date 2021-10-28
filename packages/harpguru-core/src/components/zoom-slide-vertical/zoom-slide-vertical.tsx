import { StyleSheet, View } from 'react-native'
import React from 'react'

import { useSizes } from '../../hooks'

export const ZoomSlideVertical = (): React.ReactElement => {
  const { dynamicSizes } = useSizes()
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
    },
    bottomLabelWrapper: {
      backgroundColor: 'blue',
      flex: 1,
    },
  })

  return (
    <View style={styles.componentWrapper}>
      <View style={styles.topLabelWrapper}></View>
      <View style={styles.sliderWrapper}></View>
      <View style={styles.bottomLabelWrapper}></View>
    </View>
  )
}
