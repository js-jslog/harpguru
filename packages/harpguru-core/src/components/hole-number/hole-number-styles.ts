import { StyleSheet } from 'react-native'
import type { ViewStyle, TextStyle } from 'react-native'

import { getSizes, colors } from '../../styles'

type HoleNumberStyles = {
  readonly cell: ViewStyle
  readonly text: TextStyle
}

const { holeNumbersColor } = colors

export const getStyles = (): HoleNumberStyles => {
  const sizes = getSizes()
  const { 6: fontSize, 8: width } = sizes

  const styles = StyleSheet.create<HoleNumberStyles>({
    cell: {
      justifyContent: 'center',
      alignItems: 'center',
      width,
      height: fontSize,
      top: fontSize / -2,
    },
    text: {
      fontSize,
      color: holeNumbersColor,
    },
  })

  return styles
}
