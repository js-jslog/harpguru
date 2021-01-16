import Animated from 'react-native-reanimated'
import { Text } from 'react-native'
import React from 'react'

import { getStyles } from '../../utils'
import type { TitleProps, AnimationProps } from '../../types'

export const Title = ({
  title,
  animationValue,
}: TitleProps & AnimationProps): React.ReactElement => {
  const styles = getStyles()

  return (
    <Animated.View
      style={[
        styles.titleWrapper,
        {
          opacity: animationValue,
        },
      ]}
    >
      <Text style={styles.titleText}>{title}</Text>
    </Animated.View>
  )
}
