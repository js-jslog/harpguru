import Animated, { interpolate } from 'react-native-reanimated'
import type { Node } from 'react-native-reanimated'
import { Text, StyleSheet } from 'react-native'
import React from 'react'

import { colors, getSizes } from '../../styles'

type Props = {
  readonly title: string
  readonly animatedValue: Node<number>
  readonly selfIndex: number
  readonly totalItems: number
}

export const OptionListTitle = ({
  title,
  animatedValue,
  selfIndex,
  totalItems,
}: Props): React.ReactElement => {
  const sizes = getSizes()

  const styles = StyleSheet.create({
    titlewrapper: {
      position: 'absolute',
      alignSelf: 'center',
    },
    titletext: {
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
        styles.titlewrapper,
        {
          opacity: transition,
        },
      ]}
    >
      <Text style={styles.titletext}>{title}</Text>
    </Animated.View>
  )
}
