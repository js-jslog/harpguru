import { View, Text } from 'react-native'
import React from 'react'

import { getOptionStyles } from '../../utils'

type OptionLabelProps = {
  readonly title: string
  readonly subtitle: string
  readonly labelIsTitle: boolean
}

export const OptionLabel = ({
  title,
  subtitle,
  labelIsTitle,
}: OptionLabelProps): React.ReactElement => {
  const styles = getOptionStyles()
  const titleStyles =
    labelIsTitle === true
      ? [styles.columnLabelTitle, styles.titleText]
      : [styles.columnLabelTitle]
  return (
    <View style={{ alignItems: 'center' }}>
      <View style={styles.columnLabelHighlight} />
      <Text style={titleStyles}>{title}</Text>
      <Text style={styles.columnLabelSub}>{subtitle}</Text>
    </View>
  )
}
