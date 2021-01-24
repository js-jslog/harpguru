import { View, Text } from 'react-native'
import React from 'react'

import { getOptionStyles } from '../../utils'

import { splitSuffixFromPitchOrPozition } from './utils'

type OptionTextProps = {
  readonly label: string
  readonly isLabelPitchOrPozition?: boolean
  readonly isSelected: boolean
  readonly twoColumns: boolean
}

export const OptionText = ({
  label,
  isSelected,
  isLabelPitchOrPozition,
  twoColumns,
}: OptionTextProps): React.ReactElement => {
  const styles = getOptionStyles()
  const textSelectedStyles = isSelected ? [styles.optionSelected] : []
  const textDoubledStyles = twoColumns ? [styles.optionTextDouble] : []
  const [text, superscript] = isLabelPitchOrPozition
    ? splitSuffixFromPitchOrPozition(label)
    : [label, '']
  const optionText = (
    <View
      style={[
        {
          flexDirection: 'row',
          alignItems: 'flex-start',
          justifyContent: 'center',
        },
        textDoubledStyles,
      ]}
    >
      <Text style={[styles.optionText, ...textSelectedStyles]}>{text}</Text>
      <Text style={[styles.optionText, styles.optionSuperscript]}>
        {superscript}
      </Text>
    </View>
  )
  return optionText
}
