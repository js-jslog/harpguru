import { StyleSheet } from 'react-native'
import type { ViewStyle } from 'react-native'
import type { DegreeIds } from 'harpparts'
import { useDimensions } from '@react-native-community/hooks'

import { colors, getSizes } from '../../../../styles'

export const getAccessibleStyles = (
  degreeId: DegreeIds,
  isActive: boolean
): ViewStyle => {
  const { 1: borderWidth, 2: elevation } = getSizes(useDimensions().window)
  const { degreeColors, pageColor, inertOutline, activeOutline } = colors
  const { [degreeId]: degreeColor } = degreeColors

  const styles = StyleSheet.create({
    cell: {
      backgroundColor: isActive ? degreeColor : pageColor,
      elevation: isActive ? elevation : 0,
      borderWidth: borderWidth,
      borderColor: isActive ? activeOutline : inertOutline,
    },
  })

  return styles.cell
}
