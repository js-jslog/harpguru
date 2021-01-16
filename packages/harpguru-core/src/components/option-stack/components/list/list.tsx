import Animated from 'react-native-reanimated'
import { FlatList, TouchableOpacity } from 'react-native-gesture-handler'
import { Text, SafeAreaView } from 'react-native'
import React from 'react'

import { getStyles } from '../../utils'
import type { ListProps, AnimationProps } from '../../types'

export const List = <T extends unknown>({
  items,
  itemTapHandler,
  animationValue,
}: ListProps<T> & AnimationProps): React.ReactElement => {
  const styles = getStyles()

  return (
    <Animated.View
      style={[
        styles.listWrapper,
        {
          opacity: animationValue,
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
