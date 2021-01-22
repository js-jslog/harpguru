import Animated from 'react-native-reanimated'
import { FlatList, TouchableOpacity } from 'react-native-gesture-handler'
import { Text, SafeAreaView } from 'react-native'
import React from 'react'

import { getOptionStyles } from '../../utils'
import type { ListProps, OptionTypes, WithTransition } from '../../types'

export const OptionList = <T extends unknown, K extends OptionTypes>({
  useItems,
  itemTapHandler,
  transitionValue,
}: ListProps<T, K> & WithTransition): React.ReactElement => {
  const styles = getOptionStyles()

  return (
    <Animated.View
      style={[
        styles.listStackable,
        {
          opacity: transitionValue,
        },
      ]}
    >
      <SafeAreaView>
        <FlatList
          contentContainerStyle={styles.listContent}
          data={useItems()}
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
