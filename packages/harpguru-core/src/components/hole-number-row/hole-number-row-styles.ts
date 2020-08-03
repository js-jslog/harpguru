import type { ViewStyle } from 'react-native'
import { StyleSheet } from 'react-native'

type HoleNumberRowStyles = {
  readonly row: ViewStyle
}

export const getStyles = (): HoleNumberRowStyles => {
  const styles = StyleSheet.create<HoleNumberRowStyles>({
    row: {
      flex: 0,
      backgroundColor: 'red',
      flexDirection: 'row',
      justifyContent: 'space-around',
      zIndex: 10,
    },
  })

  return styles
}
