import type { ViewStyle } from 'react-native'
import { StyleSheet } from 'react-native'

import type { XRange } from '../../../types'
import { useLayoutFacts, useSizes } from '../../../hooks'

type HarpFaceFragmentStyles = {
  readonly fragment: ViewStyle
}

export const useStyles = (xRange: XRange): HarpFaceFragmentStyles => {
  const {
    dynamicSizes: { columnWidth, rowHeight },
  } = useSizes()
  const { harpFaceRowCount } = useLayoutFacts()
  const { length: fragmentColumnCount } = xRange

  const styles = StyleSheet.create<HarpFaceFragmentStyles>({
    fragment: {
      width: columnWidth * fragmentColumnCount,
      height: rowHeight * harpFaceRowCount,
    },
  })

  return styles
}
