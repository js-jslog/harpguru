import Animated from 'react-native-reanimated'
import { Text, View } from 'react-native'
import React from 'react'

import { getOptionStyles } from '../../utils'
import type { OptionTitleProps, WithTransition } from '../../types'

export const OptionTitle = ({
  title,
  useSubTitle = () => '',
  transitionValue,
}: OptionTitleProps & WithTransition): React.ReactElement => {
  const styles = getOptionStyles()
  const subTitle = useSubTitle()

  return (
    <Animated.View
      style={[
        styles.titleWrapper,
        {
          opacity: transitionValue,
        },
      ]}
    >
      <View style={styles.columnLabelHighlight} />
      <Text style={styles.titleText}>{title}</Text>
      <Text style={styles.subTitleText}>{subTitle}</Text>
    </Animated.View>
  )
}
