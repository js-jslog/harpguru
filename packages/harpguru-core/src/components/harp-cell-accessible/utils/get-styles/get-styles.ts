import { StyleSheet } from 'react-native'
import type { ViewStyle } from 'react-native'
import { DegreeIds } from 'harpstrata'

import { getSizes, colors } from '../../../../styles'

export type HarpCellStyles = {
  readonly cell: ViewStyle
}

export const getStyles = (
  degreeId: DegreeIds,
  isActive: boolean
): HarpCellStyles => {
  const sizes = getSizes()
  const { 1: borderWidth, 6: borderRadius, 2: elevation } = sizes
  const width = sizes['8'] + sizes['5']
  const height = sizes['8'] + sizes['5']
  const { pageColor, degreeColors, inertOutline, activeOutline } = colors
  const cellColor = isActive ? degreeColors[degreeId] : pageColor

  const styles = StyleSheet.create({
    cell: {
      flexDirection: 'row',
      backgroundColor: cellColor,
      justifyContent: 'center',
      alignItems: 'center',
      elevation: isActive ? elevation : 0,
      borderRadius,
      borderWidth: borderWidth,
      borderColor: isActive ? activeOutline : inertOutline,
      width,
      height,
    },
  })

  return styles
}
