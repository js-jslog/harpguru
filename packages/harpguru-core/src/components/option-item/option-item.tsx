import { TouchableOpacity } from 'react-native-gesture-handler'
import { Text, View } from 'react-native'
import React from 'react'

import { getOptionStyles } from '../../utils'
import type { ListItemProps } from '../../types'

import { splitSuffixFromPitchOrPozition } from './utils'

// TODO: How do I apply this generic without resorting to this
// form of function definition. It's fine, but it's not consistent
// when I've got function expressions everywhere else.
export function OptionItem<T>({
  label,
  isLabelPitchOrPozition = false,
  isSelected,
  itemTapHandler,
  callbackParam,
  twoColumns,
}: ListItemProps<T>): React.ReactElement {
  const styles = getOptionStyles()
  const highlighStyles = isSelected ? [styles.optionHighlight] : []
  const textSelectedStyles = isSelected ? [styles.optionSelected] : []
  const textDoubledStyles = twoColumns ? [styles.optionTextDouble] : []
  const [text, superscript] = isLabelPitchOrPozition
    ? splitSuffixFromPitchOrPozition(label)
    : [label, '']
  const itemElement = (
    <View>
      <View style={[...highlighStyles]}></View>
      <View
        style={[
          {
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
          },
          textDoubledStyles,
        ]}
      >
        <Text style={[styles.optionText, ...textSelectedStyles]}>{text}</Text>
        <Text style={[styles.optionText, styles.optionSuperscript]}>
          {superscript}
        </Text>
      </View>
    </View>
  )
  return (
    <TouchableOpacity
      disabled={isSelected ? true : false}
      onPress={() => itemTapHandler(callbackParam)}
    >
      {itemElement}
    </TouchableOpacity>
  )
}
