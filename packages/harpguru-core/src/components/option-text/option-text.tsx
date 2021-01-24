import { View, Text } from 'react-native'
import React from 'react'

import { getOptionStyles } from '../../utils'

import { splitSuffixFromPitchOrPozition } from './utils'

type OptionTextProps = {
  readonly label: string
  readonly alignItems: 'flex-start' | 'center' | 'flex-end'
  readonly isHighlighted?: boolean
  readonly isLabelPitchOrPozition?: boolean
  readonly isSelected: boolean
  readonly twoColumns: boolean
}

export const OptionText = ({
  label,
  alignItems,
  isSelected,
  isHighlighted = false,
  isLabelPitchOrPozition,
  twoColumns,
}: OptionTextProps): React.ReactElement => {
  const styles = getOptionStyles()
  const extraHighlightStyle = isSelected ? [] : [{ bottom: 0 }]
  const highlight = isHighlighted ? (
    <View style={[styles.optionHighlight, ...extraHighlightStyle]}></View>
  ) : (
    <></>
  )
  const textSelectedStyles = isSelected ? [styles.optionSelected] : []
  const textDoubledStyles = twoColumns ? [styles.optionTextDouble] : []
  const [text, superscript] = isLabelPitchOrPozition
    ? splitSuffixFromPitchOrPozition(label)
    : [label, '']
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
        <Text style={[styles.optionText, ...textSelectedStyles]}>{text}</Text>
        <Text style={[styles.optionText, styles.optionSuperscript]}>
          {superscript}
        </Text>
      </View>
    </View>
  )
  return optionText
}
