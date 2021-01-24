import { TouchableOpacity } from 'react-native-gesture-handler'
import { Text, View } from 'react-native'
import React from 'react'

import { getOptionStyles } from '../../utils'
import type { ListItemProps } from '../../types'

// TODO: How do I apply this generic without resorting to this
// form of function definition. It's fine, but it's not consistent
// when I've got function expressions everywhere else.
export function OptionItem<T>(props: ListItemProps<T>): React.ReactElement {
  const styles = getOptionStyles()
  const highlighStyles = props.isSelected ? [styles.optionHighlight] : []
  const textSelectedStyles = props.isSelected ? [styles.optionSelected] : []
  const textDoubledStyles = props.twoColumns ? [styles.optionTextDouble] : []
  const itemElement = (
    <View>
      <View style={[...highlighStyles]}></View>
      <Text
        style={[styles.optionText, ...textSelectedStyles, textDoubledStyles]}
      >
        {props.label}
      </Text>
    </View>
  )
  return (
    <TouchableOpacity
      disabled={props.isSelected ? true : false}
      onPress={() => props.itemTapHandler(props.callbackParam)}
    >
      {itemElement}
    </TouchableOpacity>
  )
}
