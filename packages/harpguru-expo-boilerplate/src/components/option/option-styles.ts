import { State } from 'react-native-gesture-handler'
import { StyleSheet, ViewStyle } from 'react-native'

import { sizes } from '../../styles'

const { 7: variableSize, 8: titleSize } = sizes

export const styles = StyleSheet.create({
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

export const getDynamicStyles = (
  state: State
): { readonly activeSwipeStyle: ViewStyle } => {
  return StyleSheet.create({
    activeSwipeStyle: {
      opacity: state === State.ACTIVE ? 0.5 : 1,
    },
  })
}
