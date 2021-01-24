import { View, Text } from 'react-native'
import React from 'react'

import { OptionValue } from '../option-value'
import { getOptionStyles } from '../../utils'

type OptionLabelProps = {
  readonly title: string
  readonly subtitle: string
  readonly alignItems: 'flex-start' | 'center' | 'flex-end'
  readonly labelIsTitle: boolean
  readonly isLabelPitchOrPozition?: boolean
}

export const OptionLabel = ({
  title,
  subtitle,
  alignItems,
  labelIsTitle,
  isLabelPitchOrPozition = false,
}: OptionLabelProps): React.ReactElement => {
  const styles = getOptionStyles()
  const titleStyles =
    labelIsTitle === true
      ? [styles.columnLabelTitle, styles.titleText]
      : [styles.columnLabelTitle]
  return (
    <View style={{ width: '100%' }}>
      <Text style={[titleStyles]}>{title}</Text>
      <OptionValue
        label={subtitle}
        alignItems={alignItems}
        isSelected={false}
        isHighlighted={true}
        twoColumns={false}
        isLabelPitchOrPozition={isLabelPitchOrPozition}
      />
    </View>
  )
}
