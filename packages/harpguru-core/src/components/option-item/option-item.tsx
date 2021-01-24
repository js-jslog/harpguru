import { TouchableOpacity } from 'react-native-gesture-handler'
import { View } from 'react-native'
import React from 'react'

import { OptionValue } from '../option-value'
import type { OptionValueProps } from '../option-value'
import { getOptionStyles } from '../../utils'

type OptionItemProps<T> = Pick<OptionValueProps, 'value' | 'twoColumns'> & {
  readonly isSelected: boolean
  readonly itemTapHandler: (arg0: T) => void
  readonly callbackParam: T
}

// TODO: How do I apply this generic without resorting to this
// form of function definition. It's fine, but it's not consistent
// when I've got function expressions everywhere else.
export function OptionItem<T>({
  value,
  twoColumns,
  isSelected,
  itemTapHandler,
  callbackParam,
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
        isLarge={isSelected}
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
