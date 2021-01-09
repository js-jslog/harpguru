import { StyleSheet } from 'react-native'
import type { ViewStyle } from 'react-native'
import type { HarpStrata } from 'harpstrata'
import { useDimensions } from '@react-native-community/hooks'

import { getHarpFaceFacts } from '../../../utils'
import { getSizes } from '../../../styles'

type HarpFaceStyles = {
  readonly face: ViewStyle
}

export const useStyles = (activeHarpStrata: HarpStrata): HarpFaceStyles => {
  const sizes = getSizes(useDimensions().window)
  const { columnWidth, rowHeight, fragmentGutter } = sizes
  const { columnCount, rowCount, octaveColumnGroups } = getHarpFaceFacts(
    activeHarpStrata
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
