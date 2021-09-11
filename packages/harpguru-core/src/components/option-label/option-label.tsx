import { StyleSheet, View } from 'react-native'
import React from 'react'

import { TextWithoutOSScale } from '../text-without-os-scale'
import { OptionValue } from '../option-value'
import type { OptionValueProps } from '../option-value'
import { colors } from '../../styles'
import { useOptionSizes } from '../../hooks'

export type OptionLabelProps = Pick<
  OptionValueProps,
  'value' | 'alignItems'
> & {
  readonly title: string
  readonly isLargeTitle: boolean
}

export const OptionLabel = ({
  title,
  isLargeTitle,
  value,
  alignItems,
}: OptionLabelProps): React.ReactElement => {
  const { smallFont, largeFont } = useOptionSizes()
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
      <TextWithoutOSScale style={titleStyles}>{title}</TextWithoutOSScale>
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
