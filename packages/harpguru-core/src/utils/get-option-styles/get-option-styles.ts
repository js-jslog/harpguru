import type { TextStyle, ViewStyle } from 'react-native'
import { StyleSheet } from 'react-native'

import { colors, getSizes, harpguruColors } from '../../styles'

type OptionStyles = {
  largeFont: number
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
  const { ['9']: largeFont } = sizes
  const { ['8']: smallFont } = sizes
  const { ['7']: superscriptFont } = sizes
  const { ['10']: lineHeight } = sizes
  const { ['7']: highlightHeight } = sizes
  const { ['11']: largeGutter } = sizes
  const { ['7']: internalGutter } = sizes
  const { ['9']: smallGutter } = sizes
  const styles = StyleSheet.create({
    titleSection: {
      flex: 1,
      alignItems: 'flex-start',
      justifyContent: 'center',
    },
    titleWrapper: {
      position: 'absolute',
      left: smallGutter,
    },
    titleText: {
      fontSize: largeFont,
    },
    stackNext: {
      position: 'absolute',
      top: smallGutter,
      left: smallGutter,
    },
    stackPrevious: {
      position: 'absolute',
      bottom: smallGutter,
      left: smallGutter,
    },
    listSection: {
      // TODO: can this just be absoluteFillObject too,
      // and does that mean we don't need thelistSection.
      // I wonder whether we need the titleSection either.
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
      paddingRight: largeGutter,
    },
    leftColumnLabelStackable: {
      position: 'absolute',
      right: largeGutter + lineHeight * 2 + internalGutter,
      height: '100%',
      alignItems: 'flex-end',
      justifyContent: 'center',
    },
    rightColumnLabelStackable: {
      position: 'absolute',
      right: 0,
      width: largeGutter - internalGutter,
      height: '100%',
      alignItems: 'flex-start',
      justifyContent: 'center',
    },
    columnLabelTitle: {
      fontSize: smallFont,
      fontWeight: 'bold',
      color: colors.inertOutline,
    },
    columnLabelSub: {
      fontSize: smallFont,
      color: colors.inertOutline,
    },
    columnLabelHighlight: {
      position: 'absolute',
      left: 0,
      right: 0,
      bottom: 0,
      height: highlightHeight,
      backgroundColor: harpguruColors.pink,
    },
    optionHighlight: {
      position: 'absolute',
      left: 0,
      right: 0,
      bottom: sizes['6'],
      height: highlightHeight,
      backgroundColor: harpguruColors.pink,
    },
    optionText: {
      fontSize: smallFont,
      lineHeight: lineHeight,
      color: colors.inertOutline,
    },
    optionSuperscript: {
      fontSize: superscriptFont,
    },
    optionTextDouble: {
      width: lineHeight,
    },
    optionSelected: {
      fontWeight: 'bold',
      fontSize: largeFont,
      color: colors.inertOutline,
    },
  })

  return { ...styles, largeFont }
}
