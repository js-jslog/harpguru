import { StyleSheet } from 'react-native'
import type { ViewStyle } from 'react-native'

import { useSizes } from '../../../../hooks'

export const getBaseHarpCellStyles = (): ViewStyle => {
  const sizes = useSizes()
  console.log(
    '::::::::::::::::::::::::::::: getBaseHarpCellStyles: ' + sizes['10']
  )
  const { 6: borderRadius } = sizes
  const width = sizes['8'] + sizes['5']
  const height = sizes['8'] + sizes['5']
  const styles = StyleSheet.create({
    cell: {
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius,
      width,
      height,
    },
  })

  return styles.cell
}
