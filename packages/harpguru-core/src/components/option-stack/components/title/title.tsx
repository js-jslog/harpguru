import Animated, { interpolate } from 'react-native-reanimated'
import { Text } from 'react-native'
import React from 'react'

import { getStyles } from '../../utils'
import type { TitleProps, AnimationProps } from '../../types'

export const Title = ({
  title,
  animatedValue,
  selfIndex,
  totalItems,
}: TitleProps & AnimationProps): React.ReactElement => {
  const styles = getStyles()

  const head = new Array(selfIndex).fill(0)
  const tail = new Array(totalItems - selfIndex - 1).fill(0)
  const outputRange = [...head, 1, ...tail]

  const transition = interpolate(animatedValue, {
    inputRange: [0, 1],
    outputRange: outputRange,
  })

  return (
    <Animated.View
      style={[
        styles.titleWrapper,
        {
          opacity: transition,
        },
      ]}
    >
      <Text style={styles.titleText}>{title}</Text>
    </Animated.View>
  )
}
