import Animated from 'react-native-reanimated'
import { FlatList } from 'react-native-gesture-handler'
import { View, Text, SafeAreaView } from 'react-native'
import React from 'react'

import { getOptionStyles } from '../../utils'
import type { OptionListProps, WithTransition } from '../../types'

export const OptionListDouble = ({
  useItems,
  useLeftColumnLabel = () => '',
  useRightColumnLabel = () => '',
  transitionValue,
}: OptionListProps & WithTransition): React.ReactElement => {
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
          data={useItems()}
          numColumns={2}
          renderItem={({ item }) => <>{item}</>}
          keyExtractor={(_item, index) => `${index}`}
        />
      </SafeAreaView>
    </Animated.View>
  )
}
