import Animated from 'react-native-reanimated'
import { FlatList, TouchableOpacity } from 'react-native-gesture-handler'
import { Text, SafeAreaView } from 'react-native'
import React from 'react'

import { getOptionStyles } from '../../utils'
import type { ListProps, WithTransition } from '../../types'

export const OptionListDouble = <T extends unknown>({
  items,
  itemTapHandler,
  transitionValue,
}: ListProps<T> & WithTransition): React.ReactElement => {
  const styles = getOptionStyles()

  return (
    <Animated.View
      style={[
        styles.listWrapper,
        {
          opacity: transitionValue,
        },
      ]}
    >
      <SafeAreaView>
        <FlatList
          data={items}
          numColumns={2}
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
