import { StyleSheet } from 'react-native'
import type { ViewStyle } from 'react-native'
import type { HarpStrata } from 'harpstrata'

import { getHarpFaceFacts } from '../../../utils'
import { useSizes } from '../../../styles'

type HarpFaceStyles = {
  readonly face: ViewStyle
}

export const useStyles = (
  activeHarpStrata: HarpStrata,
  columnBounds?: readonly [number, number]
): HarpFaceStyles => {
  const { dynamicSizes } = useSizes()
  const { columnWidth, rowHeight, fragmentGutter } = dynamicSizes
  const { columnCount, rowCount, octaveColumnGroups } = getHarpFaceFacts(
    activeHarpStrata,
    columnBounds
  )
  const { length: groupCount } = octaveColumnGroups

  const styles = StyleSheet.create({
    face: {
      flexDirection: 'row',
      justifyContent: 'space-around',
      width: columnWidth * columnCount + (fragmentGutter * groupCount + 1),
      height: rowHeight * rowCount,
    },
  })

  return styles
}
