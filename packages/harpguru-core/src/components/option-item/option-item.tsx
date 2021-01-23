import { TouchableOpacity } from 'react-native-gesture-handler'
import { Text, View } from 'react-native'
import React from 'react'

import { getOptionStyles } from '../../utils'
import type { ListItemProps } from '../../types'
import { isListItemProps_Single } from '../../types'

// TODO: How do I apply this generic without resorting to this
// form of function definition. It's fine, but it's not consistent
// when I've got function expressions everywhere else.
// If I figure this out then perhaps I can apply the same logic to
// the definition of the option typeguard used below too.
export function OptionItem<T>(props: ListItemProps<T>): React.ReactElement {
  const styles = getOptionStyles()
  if (isListItemProps_Single(props)) {
    const itemElement = props.isSelected ? (
      <View>
        <View style={styles.optionHighlight}></View>
        <Text style={[styles.optionText, styles.optionSelected]}>
          {props.label}
        </Text>
      </View>
    ) : (
      <Text style={styles.optionText}>{props.label}</Text>
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
  const { side } = props
  const sideStyle =
    side === 'LEFT' ? styles.optionSelectedLeft : styles.optionSelectedRight
  const itemElement = props.isSelected ? (
    <View>
      <View style={styles.optionHighlight}></View>
      <Text
        style={[
          styles.optionText,
          styles.optionTextDouble,
          styles.optionSelected,
          sideStyle,
        ]}
      >
        {props.label}
      </Text>
    </View>
  ) : (
    <Text style={[styles.optionText, styles.optionTextDouble]}>
      {props.label}
    </Text>
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
