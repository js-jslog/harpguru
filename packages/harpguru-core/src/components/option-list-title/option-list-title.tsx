import Animated, { interpolate } from 'react-native-reanimated'
import type { Node } from 'react-native-reanimated'
import { Text, StyleSheet } from 'react-native'
import React from 'react'

import { getSizes } from '../../styles'

type Props = {
  readonly title: string
  readonly animatedValue: Node<number>
  readonly outputRange: ReadonlyArray<number>
}

export const OptionListTitle = ({
  title,
  animatedValue,
  outputRange,
}: Props): React.ReactElement => {
  const sizes = getSizes()

  const styles = StyleSheet.create({
    titlewrapper: {
      position: 'absolute',
      alignSelf: 'center',
    },
    titletext: {
      fontSize: sizes['9'],
    },
  })

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
