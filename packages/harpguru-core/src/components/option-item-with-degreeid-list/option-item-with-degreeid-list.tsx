import { TouchableOpacity } from 'react-native-gesture-handler'
import { StyleSheet, View } from 'react-native'
import React from 'react'
import type { DegreeIds } from 'harpparts'

import { OptionValue } from '../option-value'
import type { OptionValueProps } from '../option-value'
import { useOptionSizes } from '../../hooks'

export type OptionItemWithDegreeIdListProps<T> = Pick<
  OptionValueProps,
  'value' | 'twoColumns'
> & {
  readonly isSelected: boolean
  readonly isMultiSelect?: boolean
  readonly itemTapHandler: (arg0: ReadonlyArray<DegreeIds>, arg1: T) => void
  readonly degreeIds: ReadonlyArray<DegreeIds>
  readonly callbackParam: T
}

export const OptionItemWithDegreeIdList = <T extends unknown>({
  value,
  twoColumns,
  isSelected,
  isMultiSelect = false,
  itemTapHandler,
  degreeIds,
  callbackParam,
}: OptionItemWithDegreeIdListProps<T>): React.ReactElement => {
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
      onPress={() => itemTapHandler(degreeIds, callbackParam)}
    >
      {displayElement}
    </TouchableOpacity>
  )
}
