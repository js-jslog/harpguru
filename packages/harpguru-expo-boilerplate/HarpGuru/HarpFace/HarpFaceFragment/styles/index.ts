import { StyleSheet } from 'react-native'

import type { HarpFaceFragmentProps, HarpFaceFragmentStyles } from '../types'
import { getFragmentFacts } from '../getFragmentFacts'
import { getHarpFaceFacts, columnWidth, rowHeight } from '../../HarpFace'

export const getStyles = (
  props: HarpFaceFragmentProps
): HarpFaceFragmentStyles => {
  const { columnCount } = getFragmentFacts(props)
  const { rowCount } = getHarpFaceFacts(props)

  const styles = StyleSheet.create<HarpFaceFragmentStyles>({
    fragment: {
      width: columnWidth * columnCount,
      height: rowHeight * rowCount,
    },
  })

  return styles
}
