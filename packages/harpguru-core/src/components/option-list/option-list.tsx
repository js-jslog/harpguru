import Animated from 'react-native-reanimated'
import { FlatList } from 'react-native-gesture-handler'
import { SafeAreaView } from 'react-native'
import React from 'react'

import { getOptionStyles } from '../../utils'
import type { OptionListProps, WithTransition } from '../../types'

export const OptionList = ({
  useItems,
  transitionValue,
}: OptionListProps & WithTransition): React.ReactElement => {
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
          renderItem={({ item }) => <>{item}</>}
          keyExtractor={(_item, index) => `${index}`}
        />
      </SafeAreaView>
    </Animated.View>
  )
}
