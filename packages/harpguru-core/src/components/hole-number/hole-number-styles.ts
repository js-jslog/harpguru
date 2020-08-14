import { StyleSheet } from 'react-native'
import type { ViewStyle, TextStyle } from 'react-native'

import { sizes, colors } from '../../styles'

type HoleNumberStyles = {
  readonly cell: ViewStyle
  readonly text: TextStyle
}

const { 6: fontSize, 8: width } = sizes
const { holeNumbersColor } = colors

export const getStyles = (): HoleNumberStyles => {
  const styles = StyleSheet.create<HoleNumberStyles>({
    cell: {
      justifyContent: 'center',
      alignItems: 'center',
      width,
      height: 0,
    },
    text: {
      fontSize,
      color: holeNumbersColor,
    },
  })

  return styles
}
