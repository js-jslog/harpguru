import { useGlobal } from 'reactn'
import type { ViewStyle } from 'react-native'
import { StyleSheet } from 'react-native'

import type { XRange } from '../../../types'
import { useSizes } from '../../../hooks'

type HarpFaceFragmentStyles = {
  readonly fragment: ViewStyle
}

export const useStyles = (
  xRange: XRange,
  harpfaceIndex: 'harpface1' | 'harpface2'
): HarpFaceFragmentStyles => {
  const {
    dynamicSizes: { columnWidth, rowHeight },
  } = useSizes()
  const [layoutFacts] = useGlobal('layoutFacts')
  const {
    [harpfaceIndex === 'harpface1' ? 0 : 1]: { harpfaceRows },
  } = layoutFacts
  const { length: fragmentColumnCount } = xRange

  const styles = StyleSheet.create<HarpFaceFragmentStyles>({
    fragment: {
      width: columnWidth * fragmentColumnCount,
      height: rowHeight * harpfaceRows,
    },
  })

  return styles
}
