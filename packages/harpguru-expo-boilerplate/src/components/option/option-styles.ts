import { State } from 'react-native-gesture-handler'
import { StyleSheet, ViewStyle, TextStyle } from 'react-native'

import { getSizes } from '../../styles'

type OptionStyles = {
  readonly option: ViewStyle
  readonly optionTitle: TextStyle
  readonly optionValue: TextStyle
}

export const getStyles = (): OptionStyles => {
  const sizes = getSizes()
  const { 7: variableSize, 8: titleSize } = sizes

  const styles = StyleSheet.create({
    option: {
      flex: 1,
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'space-evenly',
    },
    optionTitle: {
      fontSize: titleSize,
    },
    optionValue: {
      fontSize: variableSize,
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
