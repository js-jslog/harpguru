import { View, Text } from 'react-native'
import React from 'react'

import { OptionValue } from '../option-value'
import type { OptionValueProps } from '../option-value'
import { getOptionStyles } from '../../utils'

type OptionLabelProps = Pick<OptionValueProps, 'value' | 'alignItems'> & {
  readonly name: string
  readonly isLargeTitle: boolean
}

export const OptionLabel = ({
  name,
  isLargeTitle,
  value,
  alignItems,
}: OptionLabelProps): React.ReactElement => {
  const styles = getOptionStyles()
  const titleStyles =
    isLargeTitle === true
      ? [styles.columnLabelTitle, { fontSize: styles.largeFont }]
      : [styles.columnLabelTitle]
  return (
    <View style={{ width: '100%' }}>
      <Text style={[titleStyles]}>{name}</Text>
      <OptionValue
        value={value}
        alignItems={alignItems}
        isHighlighted={true}
        isLarge={false}
        twoColumns={false}
      />
    </View>
  )
}
