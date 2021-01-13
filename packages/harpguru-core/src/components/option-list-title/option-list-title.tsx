import Animated from 'react-native-reanimated'
import type { Node } from 'react-native-reanimated'
import { Text, StyleSheet } from 'react-native'
import React from 'react'

import { getSizes } from '../../styles'

type Props = {
  readonly title: string
  readonly animatedValue: Node<number>
}

export const OptionListTitle = ({
  title,
  animatedValue,
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

  return (
    <Animated.View
      style={[
        styles.titlewrapper,
        {
          opacity: animatedValue,
        },
      ]}
    >
      <Text style={styles.titletext}>{title}</Text>
    </Animated.View>
  )
}
