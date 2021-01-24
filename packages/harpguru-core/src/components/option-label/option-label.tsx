import { StyleSheet, View, Text } from 'react-native'
import React from 'react'

import { OptionValue } from '../option-value'
import type { OptionValueProps } from '../option-value'
import { getOptionStyles } from '../../utils'
import { colors } from '../../styles'

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
  const { smallFont, largeFont } = getOptionStyles()
  const { base, large } = StyleSheet.create({
    base: {
      fontSize: smallFont,
      fontWeight: 'bold',
      color: colors.inertOutline,
    },
    large: {
      fontSize: largeFont,
    },
  })
  const titleStyles = isLargeTitle === true ? [base, large] : [base]
  return (
    <View style={{ width: '100%' }}>
      <Text style={titleStyles}>{name}</Text>
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
