import { StyleSheet } from 'react-native'
import type { ViewStyle } from 'react-native'
import type { HarpStrata } from 'harpstrata'

import { getHarpFaceFacts } from '../../utils'
import { sizes } from '../../styles'

type HarpFaceStyles = {
  readonly face: ViewStyle
}

const { 7: boundaryWidth } = sizes
export const { 9: columnWidth } = sizes
export const { 9: rowHeight } = sizes

export const getStyles = (activeHarpStrata: HarpStrata): HarpFaceStyles => {
  const { columnCount, rowCount, octaveColumnGroups } = getHarpFaceFacts(
    activeHarpStrata
  )
  const { length: groupCount } = octaveColumnGroups

  const styles = StyleSheet.create({
    face: {
      flexDirection: 'row',
      justifyContent: 'space-around',
      width: columnWidth * columnCount + (boundaryWidth * groupCount + 1),
      height: rowHeight * rowCount,
    },
  })

  return styles
}
