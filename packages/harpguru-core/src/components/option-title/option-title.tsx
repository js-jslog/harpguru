import Animated from 'react-native-reanimated'
import { Text } from 'react-native'
import React from 'react'

import { getOptionStyles } from '../../utils'
import type { TitleProps, WithTransition } from '../../types'

export const OptionTitle = ({
  title,
  useSubTitle = () => '',
  transitionValue,
}: TitleProps & WithTransition): React.ReactElement => {
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
      <Text style={styles.titleText}>{title}</Text>
      <Text style={styles.subTitleText}>{subTitle}</Text>
    </Animated.View>
  )
}
