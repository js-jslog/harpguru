import { StyleSheet } from 'react-native'
import type { ViewStyle } from 'react-native'
import type { DegreeIds } from 'harpparts'

import { getColors } from '../../../../utils'
import { useHarpGuruStore } from '../../../../store'

export const useAccessibleStyles = (
  degreeId: DegreeIds,
  isActive: boolean
): ViewStyle => {
  const dynamicSizes = useHarpGuruStore((state) => state.dynamicSizes)
  const { 1: borderWidth, 2: elevation } = dynamicSizes
  const { degreeColors, pageColor, inertOutline, activeOutline } = getColors()
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
