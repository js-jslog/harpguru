import { TouchableOpacity } from 'react-native-gesture-handler'
import { View } from 'react-native'
import React from 'react'

import { OptionText } from '../option-text'
import { getOptionStyles } from '../../utils'
import type { ListItemProps } from '../../types'

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
  const itemElement = (
    <View
      style={{
        height: styles.itemWidth - styles.itemHeightTrim,
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <View style={[...highlighStyles]}></View>
      <OptionText
        label={label}
        isLabelPitchOrPozition={isLabelPitchOrPozition}
        isSelected={isSelected}
        twoColumns={twoColumns}
      />
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
