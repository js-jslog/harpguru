import type { TextStyle, ViewStyle } from 'react-native'
import { StyleSheet } from 'react-native'

import { colors, getSizes, harpguruColors } from '../../styles'
import { getWindowDimensions } from '../../packages/get-window-dimensions'

type OptionStyles = {
  titleFontSize: number
  titleSection: ViewStyle
  titleWrapper: ViewStyle
  titleText: TextStyle
  stackNext: ViewStyle
  stackPrevious: ViewStyle
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
  optionSuperscript: TextStyle
  optionTextDouble: TextStyle
  optionSelected: TextStyle
}

export const getOptionStyles = (): OptionStyles => {
  const sizes = getSizes()
  const { ['9']: titleFontSize } = sizes
  const { ['11']: gutterSize } = sizes
  const { shortEdge } = getWindowDimensions()
  const styles = StyleSheet.create({
    titleSection: {
      flex: 1,
      alignItems: 'flex-start',
      justifyContent: 'center',
    },
    titleWrapper: {
      position: 'absolute',
      left: sizes['9'],
    },
    titleText: {
      fontSize: titleFontSize,
    },
    stackNext: {
      position: 'absolute',
      top: sizes['9'],
      left: sizes['9'],
    },
    stackPrevious: {
      position: 'absolute',
      bottom: sizes['9'],
      left: sizes['9'],
    },
    listSection: {
      position: 'absolute',
      top: 0,
      bottom: 0,
      right: 0,
      left: 0,
    },
    listStackable: {
      ...StyleSheet.absoluteFillObject,
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
    optionSuperscript: {
      fontSize: sizes['7'],
    },
    optionTextDouble: {
      width: sizes['10'],
    },
    optionSelected: {
      fontWeight: 'bold',
      fontSize: sizes['9'],
      color: colors.inertOutline,
    },
  })

  return { ...styles, titleFontSize }
}
