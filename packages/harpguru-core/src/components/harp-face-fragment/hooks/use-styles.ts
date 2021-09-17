import type { ViewStyle } from 'react-native'
import { StyleSheet } from 'react-native'

import { getFragmentFacts } from '../utils'
import type { XRange } from '../../../types'
import { useLayoutFacts, useSizes } from '../../../styles'

type HarpFaceFragmentStyles = {
  readonly fragment: ViewStyle
}

export const useStyles = (xRange: XRange): HarpFaceFragmentStyles => {
  const {
    dynamicSizes: { columnWidth, rowHeight },
  } = useSizes()
  const { columnCount: fragmentColumnCount } = getFragmentFacts(xRange)
  const { harpFaceRowCount } = useLayoutFacts()

  const styles = StyleSheet.create<HarpFaceFragmentStyles>({
    fragment: {
      width: columnWidth * fragmentColumnCount,
      height: rowHeight * harpFaceRowCount,
    },
  })

  return styles
}
