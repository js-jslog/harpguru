import type { ViewStyle } from 'react-native'
import { StyleSheet } from 'react-native'
import type { HarpStrata } from 'harpstrata'

import { getHarpFaceFacts } from '../../utils'
import type { XRange } from '../../types'
import { columnWidth, rowHeight } from '../../styles'

import { getFragmentFacts } from './utils'

type HarpFaceFragmentStyles = {
  readonly fragment: ViewStyle
}

export const getStyles = (
  xRange: XRange,
  activeHarpStrata: HarpStrata
): HarpFaceFragmentStyles => {
  const { columnCount } = getFragmentFacts(xRange)
  const { rowCount } = getHarpFaceFacts(activeHarpStrata)

  const styles = StyleSheet.create<HarpFaceFragmentStyles>({
    fragment: {
      width: columnWidth * columnCount,
      height: rowHeight * rowCount,
    },
  })

  return styles
}
