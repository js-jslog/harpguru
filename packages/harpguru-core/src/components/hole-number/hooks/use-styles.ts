import { StyleSheet } from 'react-native'
import type { ViewStyle, TextStyle } from 'react-native'
import { useDimensions } from '@react-native-community/hooks'

import { getSizes, colors } from '../../../styles'

type HoleNumberStyles = {
  readonly cell: ViewStyle
  readonly text: TextStyle
}

const { holeNumbersColor } = colors

export const useStyles = (): HoleNumberStyles => {
  const sizes = getSizes(useDimensions().window)
  const { 6: fontSize, 8: width } = sizes

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
