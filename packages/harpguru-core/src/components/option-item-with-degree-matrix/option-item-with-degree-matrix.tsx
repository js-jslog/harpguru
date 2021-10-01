import { TouchableOpacity } from 'react-native-gesture-handler'
import { StyleSheet, View } from 'react-native'
import React from 'react'
import type { HarpFaceMatrix, Degree } from 'harpparts'

import { OptionValue } from '../option-value'
import type { OptionValueProps } from '../option-value'
import { useOptionSizes } from '../../hooks'

export type OptionItemWithDegreeMatrixProps<T> = Pick<
  OptionValueProps,
  'value' | 'twoColumns'
> & {
  readonly isSelected: boolean
  readonly isMultiSelect?: boolean
  readonly itemTapHandler: (arg0: HarpFaceMatrix<Degree>, arg1: T) => void
  readonly degreeMatrix: HarpFaceMatrix<Degree>
  readonly callbackParam: T
}

export const OptionItemWithDegreeMatrix = <T extends unknown>({
  value,
  twoColumns,
  isSelected,
  isMultiSelect = false,
  itemTapHandler,
  degreeMatrix,
  callbackParam,
}: OptionItemWithDegreeMatrixProps<T>): React.ReactElement => {
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
      onPress={() => itemTapHandler(degreeMatrix, callbackParam)}
    >
      {displayElement}
    </TouchableOpacity>
  )
}
