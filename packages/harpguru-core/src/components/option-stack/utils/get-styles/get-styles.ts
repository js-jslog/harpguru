import type { TextStyle, ViewStyle } from 'react-native'
import { Dimensions, StyleSheet } from 'react-native'

import { colors, getSizes } from '../../../../styles'

type OptionStackStyles = {
  titleFontSize: number
  titleSection: ViewStyle
  titleWrapper: ViewStyle
  titleText: TextStyle
  listSection: ViewStyle
  listWrapper: ViewStyle
  optionText: TextStyle
}

export const getStyles = (): OptionStackStyles => {
  const sizes = getSizes()
  const { ['9']: titleFontSize } = sizes
  const { ['11']: gutterSize } = sizes
  // TODO: turn this in to a util since it's used elsewhere
  const { width: windowWidth, height: windowHeight } = Dimensions.get('window')
  const deviceHeight = windowHeight < windowWidth ? windowHeight : windowWidth
  const deviceWidth = windowHeight < windowWidth ? windowWidth : windowHeight
  const styles = StyleSheet.create({
    titleSection: {
      transform: [{ rotate: '-90deg' }],
      paddingTop: gutterSize,
      width: deviceHeight,
      justifyContent: 'space-between',
      flexDirection: 'row',
    },
    titleWrapper: {
      position: 'absolute',
      alignSelf: 'center',
    },
    titleText: {
      fontSize: titleFontSize,
      color: colors.inertOutline,
    },
    listSection: {
      fontSize: titleFontSize,
      position: 'absolute',
      top: 0,
      right: 0,
      width: deviceWidth - gutterSize - titleFontSize * 2,
      height: deviceHeight,
    },
    listWrapper: {
      position: 'absolute',
      height: '100%',
      width: '100%',
    },
    optionText: {
      alignSelf: 'flex-end',
      paddingRight: gutterSize,
      fontSize: sizes['8'],
      lineHeight: sizes['10'],
      color: colors.inertOutline,
    },
  })

  return { ...styles, titleFontSize }
}
