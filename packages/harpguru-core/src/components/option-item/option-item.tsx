import { TouchableOpacity } from 'react-native-gesture-handler'
import { View } from 'react-native'
import React from 'react'

import { OptionText } from '../option-text'
import { getOptionStyles } from '../../utils'

type OptionItemProps<T> = {
  readonly label: string
  readonly isLabelPitchOrPozition?: boolean
  readonly isSelected: boolean
  readonly itemTapHandler: (arg0: T) => void
  readonly callbackParam: T
  readonly twoColumns: boolean
}

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
      <OptionText
        label={label}
        alignItems={'center'}
        isLabelPitchOrPozition={isLabelPitchOrPozition}
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
