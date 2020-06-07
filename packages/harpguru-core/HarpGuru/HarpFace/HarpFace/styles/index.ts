import { StyleSheet } from 'react-native'

import type { HarpFaceStyles } from '../types'
import { getHarpFaceFacts } from '../getHarpFaceFacts'
import type { HarpFaceProps } from '../../types'
import { themeSizes } from '../../../Styles'

const { 9: columnWidth } = themeSizes
const { 9: rowHeight } = themeSizes

export const getStyles = (props: HarpFaceProps): HarpFaceStyles => {
  const { columnCount, rowCount } = getHarpFaceFacts(props)

  const styles = StyleSheet.create<HarpFaceStyles>({
    facewrapper: {
      flex: 5,
      alignItems: 'center',
      justifyContent: 'center',
    },
    face: {
      width: columnWidth * columnCount,
      height: rowHeight * rowCount,
    },
  })

  return styles
}
