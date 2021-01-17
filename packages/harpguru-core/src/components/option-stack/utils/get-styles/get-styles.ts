import type { TextStyle, ViewStyle } from 'react-native'
import { StyleSheet } from 'react-native'

import { getWindowDimensions } from '../../../../utils'
import { colors, getSizes } from '../../../../styles'

type OptionStackStyles = {
  titleFontSize: number
  titleSection: ViewStyle
  titleWrapper: ViewStyle
  titleText: TextStyle
  subTitleText: TextStyle
  listSection: ViewStyle
  listWrapper: ViewStyle
  optionText: TextStyle
}

export const getStyles = (): OptionStackStyles => {
  const sizes = getSizes()
  const { ['9']: titleFontSize } = sizes
  const { ['11']: gutterSize } = sizes
  const { shortEdge, longEdge } = getWindowDimensions()
  const styles = StyleSheet.create({
    titleSection: {
      transform: [{ rotate: '-90deg' }],
      paddingTop: gutterSize,
      width: shortEdge,
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
      alignSelf: 'center',
    },
    subTitleText: {
      fontSize: sizes['8'],
      color: colors.inertOutline,
      alignSelf: 'center',
    },
    listSection: {
      fontSize: titleFontSize,
      position: 'absolute',
      top: 0,
      right: 0,
      width: longEdge - gutterSize - titleFontSize * 2,
      height: shortEdge,
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
