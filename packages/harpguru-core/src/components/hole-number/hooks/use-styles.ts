import { StyleSheet } from 'react-native'
import type { ViewStyle, TextStyle } from 'react-native'

import { useSizes, colors } from '../../../styles'

type HoleNumberStyles = {
  readonly cell: ViewStyle
  readonly text: TextStyle
}

const { holeNumbersColor } = colors

export const useStyles = (): HoleNumberStyles => {
  const { dynamicSizes } = useSizes()
  const { 6: fontSize, 8: width } = dynamicSizes

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
