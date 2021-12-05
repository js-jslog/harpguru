import { useGlobal } from 'reactn'
import { StyleSheet } from 'react-native'
import type { ViewStyle } from 'react-native'
import type { DegreeIds } from 'harpparts'

import { getColors } from '../../../../utils'

export const useAccessibleStyles = (
  degreeId: DegreeIds,
  isActive: boolean
): ViewStyle => {
  const {
    [0]: { 1: borderWidth, 2: elevation },
  } = useGlobal('dynamicSizes')
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
