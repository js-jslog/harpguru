import { View, Text } from 'react-native'
import React from 'react'

import { OptionText } from '../option-text'
import { getOptionStyles } from '../../utils'

type OptionLabelProps = {
  readonly title: string
  readonly subtitle: string
  readonly alignItems: 'flex-start' | 'center' | 'flex-end'
  readonly labelIsTitle: boolean
}

export const OptionLabel = ({
  title,
  subtitle,
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
      <Text style={[titleStyles]}>{title}</Text>
      <OptionText
        label={subtitle}
        alignItems={alignItems}
        isSelected={false}
        isHighlighted={true}
        twoColumns={false}
        isLabelPitchOrPozition={true}
      />
    </View>
  )
}
