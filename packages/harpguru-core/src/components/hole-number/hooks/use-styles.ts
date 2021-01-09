import { StyleSheet } from 'react-native'
import type { ViewStyle, TextStyle } from 'react-native'

import { colors } from '../../../styles'
import { useSizes } from '../../../hooks'

type HoleNumberStyles = {
  readonly cell: ViewStyle
  readonly text: TextStyle
}

const { holeNumbersColor } = colors

export const useStyles = (): HoleNumberStyles => {
  const sizes = useSizes()
  console.log(
    '::::::::::::::::::::::::::::: useStyles (holenumber): ' + sizes['10']
  )
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
