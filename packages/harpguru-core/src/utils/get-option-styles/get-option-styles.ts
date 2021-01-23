import type { TextStyle, ViewStyle } from 'react-native'
import { StyleSheet } from 'react-native'

import { colors, getSizes, harpguruColors } from '../../styles'
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
  leftColumnLabelStackable: ViewStyle
  rightColumnLabelStackable: ViewStyle
  columnLabelTitle: TextStyle
  columnLabelSub: TextStyle
  columnLabelHighlight: ViewStyle
  optionHighlight: ViewStyle
  optionText: TextStyle
  optionTextDouble: TextStyle
  optionSelected: TextStyle
  optionSelectedLeft: TextStyle
  optionSelectedRight: TextStyle
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
      fontWeight: 'bold',
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
    leftColumnLabelStackable: {
      position: 'absolute',
      right: gutterSize + sizes['10'] * 2 + sizes['7'],
      height: shortEdge,
      alignItems: 'flex-end',
      justifyContent: 'center',
    },
    rightColumnLabelStackable: {
      position: 'absolute',
      right: 0,
      width: gutterSize - sizes['7'],
      height: shortEdge,
      alignItems: 'flex-start',
      justifyContent: 'center',
    },
    columnLabelTitle: {
      fontSize: sizes['8'],
      fontWeight: 'bold',
      color: colors.inertOutline,
    },
    columnLabelSub: {
      fontSize: sizes['8'],
      color: colors.inertOutline,
    },
    columnLabelHighlight: {
      position: 'absolute',
      left: 0,
      right: 0,
      bottom: 0,
      height: sizes['7'],
      backgroundColor: harpguruColors.pink,
    },
    optionHighlight: {
      position: 'absolute',
      left: 0,
      right: 0,
      bottom: sizes['6'],
      height: sizes['7'],
      backgroundColor: harpguruColors.pink,
    },
    optionText: {
      fontSize: sizes['8'],
      lineHeight: sizes['10'],
      color: colors.inertOutline,
    },
    optionTextDouble: {
      textAlign: 'center',
      width: sizes['10'],
    },
    optionSelected: {
      fontWeight: 'bold',
      fontSize: sizes['9'],
      color: colors.inertOutline,
    },
    optionSelectedLeft: {
      borderTopRightRadius: 0,
      borderBottomRightRadius: 0,
    },
    optionSelectedRight: {
      borderTopLeftRadius: 0,
      borderBottomLeftRadius: 0,
    },
  })

  return { ...styles, titleFontSize }
}
