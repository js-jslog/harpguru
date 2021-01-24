import { TouchableOpacity } from 'react-native-gesture-handler'
import { View } from 'react-native'
import React from 'react'
import type { Pozition, Pitch } from 'harpparts'

import { OptionValue } from '../option-value'
import { getOptionStyles } from '../../utils'

type OptionItemProps<T> = {
  readonly value: Pozition | Pitch | string
  readonly isSelected: boolean
  readonly itemTapHandler: (arg0: T) => void
  readonly callbackParam: T
  readonly twoColumns: boolean
}

// TODO: How do I apply this generic without resorting to this
// form of function definition. It's fine, but it's not consistent
// when I've got function expressions everywhere else.
export function OptionItem<T>({
  value,
  isSelected,
  itemTapHandler,
  callbackParam,
  twoColumns,
}: OptionItemProps<T>): React.ReactElement {
  const styles = getOptionStyles()
  const itemElement = (
    <View
      style={{
        height: styles.itemWidth - styles.itemHeightTrim,
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <OptionValue
        value={value}
        alignItems={'center'}
        isSelected={isSelected}
        isHighlighted={isSelected}
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
