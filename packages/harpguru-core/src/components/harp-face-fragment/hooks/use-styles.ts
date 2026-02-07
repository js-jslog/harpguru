import type { ViewStyle } from 'react-native'
import { StyleSheet } from 'react-native'

import { extractHarpFaceFacts } from '../../../utils'
import type { XRange } from '../../../types'
import { useHarpGuruStore } from '../../../store'

type HarpFaceFragmentStyles = {
  readonly fragment: ViewStyle
}

export const useStyles = (
  xRange: XRange,
  harpfaceIndex: 'harpface1' | 'harpface2'
): HarpFaceFragmentStyles => {
  const dynamicSizes = useHarpGuruStore((state) => state.dynamicSizes)
  const { columnWidth, rowHeight } = dynamicSizes
  const layoutFacts = useHarpGuruStore((state) => state.layoutFacts)
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
