import { useGlobal } from 'reactn'
import type { ViewStyle } from 'react-native'
import { StyleSheet } from 'react-native'

import { extractHarpFaceFacts } from '../../../utils'
import type { XRange } from '../../../types'

type HarpFaceFragmentStyles = {
  readonly fragment: ViewStyle
}

export const useStyles = (
  xRange: XRange,
  harpfaceIndex: 'harpface1' | 'harpface2'
): HarpFaceFragmentStyles => {
  const {
    [0]: { columnWidth, rowHeight },
  } = useGlobal('dynamicSizes')
  const [layoutFacts] = useGlobal('layoutFacts')
  const { harpfaceRows } = extractHarpFaceFacts(layoutFacts, harpfaceIndex)
  const { length: fragmentColumnCount } = xRange

  const styles = StyleSheet.create<HarpFaceFragmentStyles>({
    fragment: {
      width: columnWidth * fragmentColumnCount,
      height: rowHeight * harpfaceRows,
    },
  })

  return styles
}
