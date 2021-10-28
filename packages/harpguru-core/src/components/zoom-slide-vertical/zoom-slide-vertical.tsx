import { StyleSheet, View } from 'react-native'
import React from 'react'

import { useSizes } from '../../hooks'

export const ZoomSlideVertical = (): React.ReactElement => {
  const { dynamicSizes } = useSizes()
  const styles = StyleSheet.create({
    zoomSlideWrapper: {
      ...StyleSheet.absoluteFillObject,
      width: dynamicSizes.zoomSlideWidth,
      backgroundColor: 'green',
      left: dynamicSizes['9'], // legend width is going to have to become a named variable
    },
  })

  return <View style={styles.zoomSlideWrapper} />
}
