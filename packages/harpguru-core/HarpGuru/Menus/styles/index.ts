import { State } from 'react-native-gesture-handler'
import { StyleSheet, ViewStyle } from 'react-native'

import { themeSizes, themeColors } from '../../Styles'

const { 7: variableSize, 8: titleSize } = themeSizes

export const styles = StyleSheet.create({
  // AnimatedMenuContainer
  animatedMenuContainer: {
    ...StyleSheet.absoluteFillObject,
    opacity: 0.5,
  },
  // MenuContainer
  menuContainer: {
    ...StyleSheet.absoluteFillObject,
    flexDirection: 'row',
    backgroundColor: themeColors.inertOutline,
  },
  // OptionContainer
  optionContainer: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },
  title: {
    fontSize: titleSize
  },
  option: {
    fontSize: variableSize
  }
})

// Dynamic styles for OptionContainer
export const getDynamicStyles = (state: State): { readonly activeSwipeStyle: ViewStyle } => {
  return StyleSheet.create({
    activeSwipeStyle: {
      backgroundColor: (state === State.ACTIVE ? themeColors.inertOutline : 'transparent')
    }
  })
}
