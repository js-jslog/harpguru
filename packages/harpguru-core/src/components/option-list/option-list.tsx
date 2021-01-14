import Animated, { interpolate } from 'react-native-reanimated'
import type { Node } from 'react-native-reanimated'
import { FlatList, TouchableOpacity } from 'react-native-gesture-handler'
import { Text, SafeAreaView, StyleSheet } from 'react-native'
import React from 'react'
import type { DegreeIds, Scale } from 'harpparts'

import { getSizes } from '../../styles'

type ListProps = {
  readonly scales: ReadonlyArray<Scale>
  readonly tapHandler: (arg0: ReadonlyArray<DegreeIds>) => void
  readonly animatedValue: Node<number>
  readonly selfIndex: number
  readonly totalItems: number
}

export const OptionList = ({
  scales,
  tapHandler,
  animatedValue,
  selfIndex,
  totalItems,
}: ListProps): React.ReactElement => {
  const sizes = getSizes()

  if (selfIndex > totalItems - 1)
    throw Error('`selfIndex` will not fit in to list of size `totalItems`')

  const styles = StyleSheet.create({
    absolute: {
      position: 'absolute',
      height: '100%',
      width: '100%',
    },
    optionText: {
      alignSelf: 'center',
      fontSize: sizes['8'],
      lineHeight: sizes['10'],
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
        styles.absolute,
        {
          opacity: transition,
        },
      ]}
    >
      <SafeAreaView>
        <FlatList
          data={scales}
          renderItem={({ item }) => (
            <TouchableOpacity onPress={() => tapHandler(item.degrees)}>
              <Text style={styles.optionText}>{item.label}</Text>
            </TouchableOpacity>
          )}
          keyExtractor={(item) => `${item.id}`}
        />
      </SafeAreaView>
    </Animated.View>
  )
}
