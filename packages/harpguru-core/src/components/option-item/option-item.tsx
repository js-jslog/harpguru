import { TouchableOpacity } from 'react-native-gesture-handler'
import { StyleSheet, View } from 'react-native'
import React from 'react'

import { OptionValue } from '../option-value'
import type { OptionValueProps } from '../option-value'
import { getOptionSizes } from '../../utils'

export type OptionItemProps<T> = Pick<
  OptionValueProps,
  'value' | 'twoColumns'
> & {
  readonly isSelected: boolean
  readonly itemTapHandler: (arg0: T) => void
  readonly callbackParam: T
}

export const OptionItem = <T extends unknown>({
  value,
  twoColumns,
  isSelected,
  itemTapHandler,
  callbackParam,
}: OptionItemProps<T>): React.ReactElement => {
  const { itemWidth, itemHeightTrim } = getOptionSizes()
  const { itemAlignment } = StyleSheet.create({
    itemAlignment: {
      height: itemWidth - itemHeightTrim,
      alignItems: 'center',
      justifyContent: 'center',
    },
  })
  const displayElement = (
    <View style={itemAlignment}>
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
      {displayElement}
    </TouchableOpacity>
  )
}
