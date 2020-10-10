import { State } from 'react-native-gesture-handler'
import { StyleSheet, ViewStyle, TextStyle } from 'react-native'

import { getSizes, colors } from '../../styles'

type OptionStyles = {
  readonly option: ViewStyle
  readonly optionTitle: TextStyle
  readonly optionValues: ViewStyle
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
    distantOptionValue: {
      alignSelf: 'center',
      textAlign: 'center',
      fontSize: sizes['6'],
      lineHeight: sizes['7'],
      color: colors.inertOutline,
      minWidth: '50%',
    },
    nextOptionValue: {
      alignSelf: 'center',
      textAlign: 'center',
      fontSize: sizes['7'],
      lineHeight: sizes['8'],
      color: colors.inertOutline,
      minWidth: '50%',
    },
    activeOptionValue: {
      alignSelf: 'center',
      textAlign: 'center',
      // sizes['8'] is just a little too big for the wide
      // words to fit in the column. This is a compromise
      // since I can't think of a better way to highlight
      // the words. When they are not all capital letters
      // anymore this should be less of a problem.
      fontSize: sizes['7'] + sizes['5'],
      fontWeight: 'bold',
      lineHeight: sizes['9'],
      minWidth: '50%',
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
