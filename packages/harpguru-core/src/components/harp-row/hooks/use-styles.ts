import { StyleSheet } from 'react-native'
import type { ViewStyle } from 'react-native'
import type { HarpFaceMatrix, Interaction } from 'harpparts'

import { isBlowOrDrawRow, isBlowRow, isDrawRow } from '../utils'
import { getColors } from '../../../utils'
import type { Coord } from '../../../types'
import { useSizes } from '../../../hooks'

type HarpRowStyles = {
  readonly row: ViewStyle
}

const { homeRowsColor, inertOutline } = getColors()

export const useStyles = (
  yCoord: Coord,
  interactionMatrix: HarpFaceMatrix<Interaction>
): HarpRowStyles => {
  const { dynamicSizes } = useSizes()
  const { 0: borderWidth, 6: borderRadius } = dynamicSizes

  const styles = StyleSheet.create<HarpRowStyles>({
    row: {
      flex: 1,
      flexDirection: 'row',
      justifyContent: 'space-around',
      alignItems: 'center',
      borderColor: inertOutline,
      borderTopWidth: isBlowRow(yCoord, interactionMatrix) ? borderWidth : 0,
      borderBottomWidth: isDrawRow(yCoord, interactionMatrix) ? borderWidth : 0,
      borderRightWidth: isBlowOrDrawRow(yCoord, interactionMatrix)
        ? borderWidth
        : 0,
      borderLeftWidth: isBlowOrDrawRow(yCoord, interactionMatrix)
        ? borderWidth
        : 0,
      backgroundColor: isBlowOrDrawRow(yCoord, interactionMatrix)
        ? homeRowsColor
        : 'transparent',
      borderTopLeftRadius: isBlowRow(yCoord, interactionMatrix)
        ? borderRadius
        : 0,
      borderTopRightRadius: isBlowRow(yCoord, interactionMatrix)
        ? borderRadius
        : 0,
      borderBottomLeftRadius: isDrawRow(yCoord, interactionMatrix)
        ? borderRadius
        : 0,
      borderBottomRightRadius: isDrawRow(yCoord, interactionMatrix)
        ? borderRadius
        : 0,
    },
  })

  return styles
}
