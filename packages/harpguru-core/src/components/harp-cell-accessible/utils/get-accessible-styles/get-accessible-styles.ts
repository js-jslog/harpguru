import { StyleSheet } from 'react-native'
import type { ViewStyle } from 'react-native'
import { DegreeIds } from 'harpstrata'

import { colors, getSizes } from '../../../../styles'

export const getAccessibleStyles = (
  degreeId: DegreeIds,
  isActive: boolean
): ViewStyle => {
  const { 1: borderWidth, 2: elevation } = getSizes()
  const { pageColor, degreeColors, inertOutline, activeOutline } = colors
  const cellColor = isActive ? degreeColors[degreeId] : pageColor

  const styles = StyleSheet.create({
    cell: {
      backgroundColor: cellColor,
      elevation: isActive ? elevation : 0,
      borderWidth: borderWidth,
      borderColor: isActive ? activeOutline : inertOutline,
    },
  })

  return styles.cell
}
