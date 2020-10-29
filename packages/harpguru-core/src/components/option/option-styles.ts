import { State } from 'react-native-gesture-handler'
import { StyleSheet, ViewStyle, TextStyle } from 'react-native'

import { getSizes } from '../../styles'

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
    },
  })

  return styles
}

export const getDynamicStyles = (
  state: State
): { readonly activeSwipeStyle: ViewStyle } => {
  return StyleSheet.create({
    activeSwipeStyle: {
      opacity: state === State.ACTIVE ? 0.5 : 1,
    },
  })
}
