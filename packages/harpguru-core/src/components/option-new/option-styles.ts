import { StyleSheet, ViewStyle, TextStyle } from 'react-native'

import { getSizes } from '../../styles'

type OptionStyles = {
  readonly option: ViewStyle
  readonly optionTitle: TextStyle
}

export const getStyles = (): OptionStyles => {
  const sizes = getSizes()

  const styles = StyleSheet.create({
    option: {
      flex: 1,
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingBottom: sizes['9'],
    },
    optionTitle: {
      alignSelf: 'center',
      fontSize: sizes['8'],
      paddingTop: sizes['10'],
      textDecorationLine: 'underline',
    },
  })

  return styles
}
