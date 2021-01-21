import type { TextStyle, ViewStyle } from 'react-native'
import { StyleSheet } from 'react-native'

import { colors, getSizes } from '../../styles'
import { getWindowDimensions } from '../../packages/get-window-dimensions'

type OptionStyles = {
  titleFontSize: number
  titleSection: ViewStyle
  titleWrapper: ViewStyle
  titleText: TextStyle
  subTitleText: TextStyle
  listSection: ViewStyle
  listStackable: ViewStyle
  listContent: ViewStyle
  leftColumnLabel: TextStyle
  rightColumnLabel: TextStyle
  optionText: TextStyle
  optionTextDouble: TextStyle
}

export const getOptionStyles = (): OptionStyles => {
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
      position: 'absolute',
      top: 0,
      right: 0,
      width: longEdge - gutterSize - titleFontSize * 2,
      height: shortEdge,
    },
    listStackable: {
      position: 'absolute',
      height: '100%',
      width: '100%',
    },
    listContent: {
      alignItems: 'flex-end',
      paddingRight: gutterSize,
    },
    leftColumnLabel: {
      position: 'absolute',
    },
    rightColumnLabel: {
      position: 'absolute',
    },
    optionText: {
      fontSize: sizes['8'],
      lineHeight: sizes['10'],
      color: colors.inertOutline,
    },
    optionTextDouble: {
      width: sizes['10'],
    },
  })

  return { ...styles, titleFontSize }
}
