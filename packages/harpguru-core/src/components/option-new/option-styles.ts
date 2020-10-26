import { StyleSheet, ViewStyle, TextStyle } from 'react-native'

import { getSizes, colors } from '../../styles'

type OptionStyles = {
  readonly option: ViewStyle
  readonly optionTitle: TextStyle
  readonly optionValues: ViewStyle
}

export const getStyles = (): OptionStyles => {
  const sizes = getSizes()

  const styles = StyleSheet.create({
    option: {
      flex: 1,
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'space-between',
    },
    optionTitle: {
      alignSelf: 'center',
      fontSize: sizes['8'],
      paddingTop: sizes['10'],
      textDecorationLine: 'underline',
    },
    optionValues: {
      paddingBottom: sizes['9'],
      alignSelf: 'center',
      textAlign: 'center',
      fontSize: sizes['7'],
      lineHeight: sizes['8'],
      color: colors.inertOutline,
      minWidth: '50%',
    },
  })

  return styles
}