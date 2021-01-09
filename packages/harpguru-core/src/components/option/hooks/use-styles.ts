import { StyleSheet, ViewStyle, TextStyle } from 'react-native'

import { useSizes } from '../../../hooks'

type OptionStyles = {
  readonly option: ViewStyle
  readonly optionTitle: TextStyle
  readonly optionValues: ViewStyle
}

export const useStyles = (): OptionStyles => {
  const sizes = useSizes()

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
    },
  })

  return styles
}
