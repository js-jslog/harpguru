import { StyleSheet } from 'react-native'
import type { HarpStrata } from 'harpstrata'

import type { HarpRowProps, HarpRowStyles } from '../types'
import { isBlowOrDrawRow, isBlowRow, isDrawRow } from '../isBlowOrDrawRow'
import { themeSizes, themeColors } from '../../../Theme'

const { 1: borderWidth, 6: borderRadius } = themeSizes
const { homeRowsColor, inertOutline } = themeColors

type Props = Pick<HarpRowProps, 'yCoord'> & {
  readonly activeHarpStrata: HarpStrata
}

export const getStyles = (props: Props): HarpRowStyles => {
  const styles = StyleSheet.create<HarpRowStyles>({
    row: {
      flex: 1,
      flexDirection: 'row',
      justifyContent: 'space-around',
      alignItems: 'center',
      borderColor: inertOutline,
      borderTopWidth: isBlowRow(props) ? borderWidth : 0,
      borderBottomWidth: isDrawRow(props) ? borderWidth : 0,
      borderRightWidth: isBlowOrDrawRow(props) ? borderWidth : 0,
      borderLeftWidth: isBlowOrDrawRow(props) ? borderWidth : 0,
      backgroundColor: isBlowOrDrawRow(props) ? homeRowsColor : 'transparent',
      borderTopLeftRadius: isBlowRow(props) ? borderRadius : 0,
      borderTopRightRadius: isBlowRow(props) ? borderRadius : 0,
      borderBottomLeftRadius: isDrawRow(props) ? borderRadius : 0,
      borderBottomRightRadius: isDrawRow(props) ? borderRadius : 0,
    },
  })

  return styles
}
