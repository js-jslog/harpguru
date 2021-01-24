import type { TextStyle, ViewStyle } from 'react-native'
import { StyleSheet } from 'react-native'

import { colors, getSizes, harpguruColors } from '../../styles'

type OptionStyles = {
  largeFont: number
  itemWidth: number
  itemHeightTrim: number
  largeGutter: number
  smallGutter: number
  internalGutter: number
  columnLabelTitle: TextStyle
  columnLabelSub: TextStyle
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
  const { ['10']: itemWidth } = sizes
  const { ['6']: itemHeightTrim } = sizes
  const { ['7']: highlightHeight } = sizes
  const { ['11']: largeGutter } = sizes
  const { ['7']: internalGutter } = sizes
  const { ['9']: smallGutter } = sizes
  const styles = StyleSheet.create({
    columnLabelTitle: {
      fontSize: smallFont,
      fontWeight: 'bold',
      color: colors.inertOutline,
    },
    columnLabelSub: {
      fontSize: smallFont,
      color: colors.inertOutline,
    },
    optionHighlight: {
      position: 'absolute',
      left: 0,
      right: 0,
      bottom: sizes['5'],
      height: highlightHeight,
      backgroundColor: harpguruColors.pink,
    },
    optionText: {
      fontSize: smallFont,
      color: colors.inertOutline,
    },
    optionSuperscript: {
      fontSize: superscriptFont,
    },
    optionTextDouble: {
      width: itemWidth,
    },
    optionSelected: {
      fontWeight: 'bold',
      fontSize: largeFont,
      color: colors.inertOutline,
    },
  })

  return {
    ...styles,
    largeFont,
    itemWidth,
    itemHeightTrim,
    largeGutter,
    smallGutter,
    internalGutter,
  }
}
