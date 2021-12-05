import { useGlobal } from 'reactn'
import { StyleSheet } from 'react-native'
import type { ViewStyle, TextStyle } from 'react-native'

import { getColors } from '../../../utils'

type HoleNumberStyles = {
  readonly cell: ViewStyle
  readonly text: TextStyle
}

const { holeNumbersColor } = getColors()

export const useStyles = (): HoleNumberStyles => {
  const [dynamicSizes] = useGlobal('dynamicSizes')
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
