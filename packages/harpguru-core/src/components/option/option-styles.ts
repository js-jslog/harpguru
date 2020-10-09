import { State } from 'react-native-gesture-handler'
import { StyleSheet, ViewStyle, TextStyle } from 'react-native'

import { getSizes, colors } from '../../styles'

type OptionStyles = {
  readonly option: ViewStyle
  readonly optionTitle: TextStyle
  readonly distantOptionValue: TextStyle
  readonly nextOptionValue: TextStyle
  readonly activeOptionValue: TextStyle
}

export const getStyles = (): OptionStyles => {
  const sizes = getSizes()

  const styles = StyleSheet.create({
    option: {
      flex: 1,
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'space-evenly',
    },
    optionTitle: {
      alignSelf: 'center',
      fontSize: sizes['8'],
    },
    distantOptionValue: {
      alignSelf: 'center',
      fontSize: sizes['6'],
      color: colors.inertOutline,
      lineHeight: sizes['7'],
    },
    nextOptionValue: {
      alignSelf: 'center',
      fontSize: sizes['7'],
      color: colors.inertOutline,
      lineHeight: sizes['8'],
    },
    activeOptionValue: {
      alignSelf: 'center',
      fontSize: sizes['8'],
      fontWeight: 'bold',
      lineHeight: sizes['9'],
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
