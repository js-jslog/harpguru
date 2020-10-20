import { StyleSheet } from 'react-native'
import type { ViewStyle } from 'react-native'

import { colors, getSizes } from '../../../../styles'

export const getBaseHarpCellStyles = (): ViewStyle => {
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
      borderRadius,
      borderWidth: 0,
      width,
      height,
    },
  })

  return styles.cell
}
