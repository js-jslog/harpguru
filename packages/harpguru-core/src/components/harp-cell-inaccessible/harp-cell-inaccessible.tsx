import { StyleSheet, View } from 'react-native'
import React from 'react'

import { getSizes, colors } from '../../styles'

export const HarpCellInaccessible = (): React.ReactElement => {
  const sizes = getSizes()
  const { 6: borderRadius } = sizes
  const { pageColor } = colors
  const width = sizes['8'] + sizes['5']
  const height = sizes['8'] + sizes['5']
  const styles = StyleSheet.create({
    cell: {
      flexDirection: 'row',
      backgroundColor: pageColor,
      justifyContent: 'center',
      alignItems: 'center',
      elevation: 0,
      borderRadius,
      borderWidth: 0,
      width,
      height,
    },
  })
  return (
    <View accessible={false} style={styles.cell}>
      <View style={styles.cell} />
    </View>
  )
}

export const MemoHarpCellInaccessible = React.memo(HarpCellInaccessible)
