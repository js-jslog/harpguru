import { StyleSheet } from 'react-native'

import type { HoleNumberRowStyles } from '../types'

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
