import Animated, { interpolate } from 'react-native-reanimated'
import { FlatList, TouchableOpacity } from 'react-native-gesture-handler'
import { Text, SafeAreaView, StyleSheet } from 'react-native'
import React from 'react'

import type { ListProps, AnimationProps } from '../../types'
import { colors, getSizes } from '../../../../styles'

export const List = <T extends unknown>({
  items,
  itemTapHandler,
  animatedValue,
  selfIndex,
  totalItems,
}: ListProps<T> & AnimationProps): React.ReactElement => {
  const sizes = getSizes()

  if (selfIndex > totalItems - 1)
    throw Error('`selfIndex` will not fit in to list of size `totalItems`')

  const styles = StyleSheet.create({
    listWrapper: {
      height: '100%',
      width: '100%',
    },
    optionText: {
      alignSelf: 'flex-end',
      paddingRight: sizes['11'],
      fontSize: sizes['8'],
      lineHeight: sizes['10'],
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
        styles.listWrapper,
        {
          opacity: transition,
        },
      ]}
    >
      <SafeAreaView>
        <FlatList
          data={items}
          renderItem={({ item }) => (
            <TouchableOpacity
              onPress={() => itemTapHandler(item.callbackParam)}
            >
              <Text style={styles.optionText}>{item.label}</Text>
            </TouchableOpacity>
          )}
          keyExtractor={(item) => `${item.label}`}
        />
      </SafeAreaView>
    </Animated.View>
  )
}
