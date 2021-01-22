import Animated from 'react-native-reanimated'
import { FlatList, TouchableOpacity } from 'react-native-gesture-handler'
import { View, Text, SafeAreaView } from 'react-native'
import React from 'react'

import { getOptionStyles } from '../../utils'
import type { ListProps, WithTransition } from '../../types'

export const OptionListDouble = <T extends unknown>({
  items,
  itemTapHandler,
  useLeftColumnLabel = () => '',
  useRightColumnLabel = () => '',
  transitionValue,
}: ListProps<T> & WithTransition): React.ReactElement => {
  const styles = getOptionStyles()
  const leftColumnLabel = useLeftColumnLabel()
  const rightColumnLabel = useRightColumnLabel()

  return (
    <Animated.View
      style={[
        styles.listStackable,
        {
          opacity: transitionValue,
        },
      ]}
    >
      <View style={styles.leftColumnLabelStackable}>
        <Text style={styles.leftColumnLabel}>{leftColumnLabel}</Text>
      </View>
      <View style={styles.rightColumnLabelStackable}>
        <Text style={styles.rightColumnLabel}>{rightColumnLabel}</Text>
      </View>
      <SafeAreaView style={styles.listStackable}>
        <FlatList
          contentContainerStyle={styles.listContent}
          data={items}
          numColumns={2}
          renderItem={({ item }) => (
            <TouchableOpacity
              onPress={() => itemTapHandler(item.callbackParam)}
            >
              <Text style={[styles.optionText, styles.optionTextDouble]}>
                {item.label}
              </Text>
            </TouchableOpacity>
          )}
          keyExtractor={(item) => `${item.label}`}
        />
      </SafeAreaView>
    </Animated.View>
  )
}
