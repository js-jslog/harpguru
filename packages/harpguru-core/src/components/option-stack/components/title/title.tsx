import Animated, { interpolate } from 'react-native-reanimated'
import { Text, StyleSheet } from 'react-native'
import React from 'react'

import type { TitleProps, AnimationProps } from '../../types'
import { colors, getSizes } from '../../../../styles'

export const Title = ({
  title,
  animatedValue,
  selfIndex,
  totalItems,
}: TitleProps & AnimationProps): React.ReactElement => {
  const sizes = getSizes()

  const styles = StyleSheet.create({
    titleWrapper: {
      alignSelf: 'center',
    },
    titleText: {
      fontSize: sizes['9'],
      color: colors.inertOutline,
    },
  })

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
