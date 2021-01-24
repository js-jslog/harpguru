import { View, Text } from 'react-native'
import React from 'react'
import type { Pozition, Pitch } from 'harpparts'
import { isPozition, isPitch } from 'harpparts'

import { getOptionStyles } from '../../utils'

type OptionValueProps = {
  readonly value: Pozition | Pitch | string
  readonly alignItems: 'flex-start' | 'center' | 'flex-end'
  readonly isHighlighted?: boolean
  readonly isSelected: boolean
  readonly twoColumns: boolean
}

export const OptionValue = ({
  value,
  alignItems,
  isSelected,
  isHighlighted = false,
  twoColumns,
}: OptionValueProps): React.ReactElement => {
  const styles = getOptionStyles()
  const extraHighlightStyle = isSelected ? [] : [{ bottom: 0 }]
  const highlight = isHighlighted ? (
    <View style={[styles.optionHighlight, ...extraHighlightStyle]}></View>
  ) : (
    <></>
  )
  const textSelectedStyles = isSelected ? [styles.optionSelected] : []
  const textDoubledStyles = twoColumns ? [styles.optionTextDouble] : []
  const [regularscript, superscript] =
    typeof value !== 'string' && (isPozition(value) || isPitch(value))
      ? value.simpleSplitValue
      : [value, '']
  const optionText = (
    <View style={{ width: '100%' }}>
      {highlight}
      <View
        style={[
          {
            flexDirection: 'row',
            alignItems: 'flex-start',
            justifyContent: alignItems,
          },
          textDoubledStyles,
        ]}
      >
        <Text style={[styles.optionText, ...textSelectedStyles]}>
          {regularscript}
        </Text>
        <Text style={[styles.optionText, styles.optionSuperscript]}>
          {superscript}
        </Text>
      </View>
    </View>
  )
  return optionText
}
