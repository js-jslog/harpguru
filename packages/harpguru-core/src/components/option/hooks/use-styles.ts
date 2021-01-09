import { StyleSheet, ViewStyle, TextStyle } from 'react-native'
import { useDimensions } from '@react-native-community/hooks'

import { getSizes } from '../../../styles'

type OptionStyles = {
  readonly option: ViewStyle
  readonly optionTitle: TextStyle
  readonly optionValues: ViewStyle
}

export const useStyles = (): OptionStyles => {
  const sizes = getSizes(useDimensions().window)

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
