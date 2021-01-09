import type { ViewStyle } from 'react-native'
import { StyleSheet } from 'react-native'
import type { HarpStrata } from 'harpstrata'
import { useDimensions } from '@react-native-community/hooks'

import { getHarpFaceFacts } from '../../utils'
import type { XRange } from '../../types'
import { getSizes } from '../../styles'

import { getFragmentFacts } from './utils'

type HarpFaceFragmentStyles = {
  readonly fragment: ViewStyle
}

export const getStyles = (
  xRange: XRange,
  activeHarpStrata: HarpStrata
): HarpFaceFragmentStyles => {
  const { columnWidth, rowHeight } = getSizes(useDimensions().window)
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
