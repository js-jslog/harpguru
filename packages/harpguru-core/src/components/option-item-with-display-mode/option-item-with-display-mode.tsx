import { TouchableOpacity } from 'react-native-gesture-handler'
import { StyleSheet, View } from 'react-native'
import React from 'react'

import { OptionValue } from '../option-value'
import type { OptionValueProps } from '../option-value'
import type { DisplayModes } from '../../types'
import { useOptionSizes } from '../../hooks'

export type OptionItemWithDisplayModeProps<T> = Pick<
  OptionValueProps,
  'value' | 'twoColumns'
> & {
  readonly isSelected: boolean
  readonly isMultiSelect?: boolean
  readonly itemTapHandler: (arg0: DisplayModes, arg1: T) => void
  readonly displayMode: DisplayModes
  readonly callbackParam: T
}

export const OptionItemWithDisplayMode = <T extends unknown>({
  value,
  twoColumns,
  isSelected,
  isMultiSelect = false,
  itemTapHandler,
  displayMode,
  callbackParam,
}: OptionItemWithDisplayModeProps<T>): React.ReactElement => {
  const { itemWidth, itemHeightTrim } = useOptionSizes()
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
        isLarge={isSelected && !isMultiSelect}
        isHighlighted={isSelected}
        twoColumns={twoColumns}
      />
    </View>
  )
  return (
    <TouchableOpacity
      disabled={isSelected && !isMultiSelect ? true : false}
      onPress={() => itemTapHandler(displayMode, callbackParam)}
    >
      {displayElement}
    </TouchableOpacity>
  )
}
