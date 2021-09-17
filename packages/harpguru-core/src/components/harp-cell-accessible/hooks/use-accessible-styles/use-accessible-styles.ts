import { StyleSheet } from 'react-native'
import type { ViewStyle } from 'react-native'
import type { DegreeIds } from 'harpparts'

import { colors } from '../../../../styles'
import { useSizes } from '../../../../hooks'

export const useAccessibleStyles = (
  degreeId: DegreeIds,
  isActive: boolean
): ViewStyle => {
  const {
    dynamicSizes: { 1: borderWidth, 2: elevation },
  } = useSizes()
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
