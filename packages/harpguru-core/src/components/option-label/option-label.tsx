import { View, Text } from 'react-native'
import React from 'react'
import type { Pozition, Pitch } from 'harpparts'

import { OptionValue } from '../option-value'
import { getOptionStyles } from '../../utils'

type OptionLabelProps = {
  readonly name: string
  readonly value: Pozition | Pitch | string
  readonly alignItems: 'flex-start' | 'center' | 'flex-end'
  readonly labelIsTitle: boolean
}

export const OptionLabel = ({
  name,
  value,
  alignItems,
  labelIsTitle,
}: OptionLabelProps): React.ReactElement => {
  const styles = getOptionStyles()
  const titleStyles =
    labelIsTitle === true
      ? [styles.columnLabelTitle, styles.titleText]
      : [styles.columnLabelTitle]
  return (
    <View style={{ width: '100%' }}>
      <Text style={[titleStyles]}>{name}</Text>
      <OptionValue
        value={value}
        alignItems={alignItems}
        isSelected={false}
        isHighlighted={true}
        twoColumns={false}
      />
    </View>
  )
}
