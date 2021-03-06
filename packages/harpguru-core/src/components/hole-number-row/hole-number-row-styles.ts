import type { ViewStyle } from 'react-native'
import { StyleSheet } from 'react-native'

type HoleNumberRowStyles = {
  readonly row: ViewStyle
}

export const getStyles = (): HoleNumberRowStyles => {
  const styles = StyleSheet.create<HoleNumberRowStyles>({
    row: {
      height: 0,
      backgroundColor: 'red',
      flexDirection: 'row',
      justifyContent: 'space-around',
      zIndex: 3,
    },
  })

  return styles
}
