import { StyleSheet, TextStyle } from 'react-native'

import { getSizes, colors } from '../../styles'

type OptionStyles = {
  readonly optionValues: TextStyle
  readonly optionValuesActive: TextStyle
}

export const getStyles = (): OptionStyles => {
  const sizes = getSizes()

  const styles = StyleSheet.create({
    optionValues: {
      alignSelf: 'center',
      textAlign: 'center',
      fontSize: sizes['7'],
      lineHeight: sizes['8'],
      color: colors.inertOutline,
      minWidth: '50%',
    },
    optionValuesActive: {
      fontWeight: 'bold',
      lineHeight: sizes['9'],
    },
  })

  return styles
}
