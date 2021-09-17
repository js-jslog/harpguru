import type { ViewStyle } from 'react-native'
import { StyleSheet } from 'react-native'
import type { HarpStrata } from 'harpstrata'

import { getFragmentFacts } from '../utils'
import { getHarpFaceFacts } from '../../../utils'
import type { XRange } from '../../../types'
import { useSizes } from '../../../styles'

type HarpFaceFragmentStyles = {
  readonly fragment: ViewStyle
}

export const useStyles = (
  xRange: XRange,
  activeHarpStrata: HarpStrata
): HarpFaceFragmentStyles => {
  const {
    dynamicSizes: { columnWidth, rowHeight },
  } = useSizes()
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
