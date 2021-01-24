import Animated from 'react-native-reanimated'
import { FlatList } from 'react-native-gesture-handler'
import { StyleSheet, View, SafeAreaView } from 'react-native'
import React from 'react'

import { getOptionStyles } from '../../utils'
import type { WithTransition } from '../../types'

export type OptionListProps = WithTransition & {
  readonly useItems: () => ReadonlyArray<React.ReactElement>
  readonly twoColumns?: boolean
  readonly useLeftColumnLabel?: () => React.ReactElement
  readonly useRightColumnLabel?: () => React.ReactElement
}

export const OptionList = ({
  useItems,
  twoColumns = false,
  useLeftColumnLabel = () => <></>,
  useRightColumnLabel = () => <></>,
  transitionValue,
}: OptionListProps): React.ReactElement => {
  const styles = getOptionStyles()
  const leftColumnLabel = useLeftColumnLabel()
  const rightColumnLabel = useRightColumnLabel()

  return (
    <Animated.View
      style={{
        ...StyleSheet.absoluteFillObject,
        opacity: transitionValue,
      }}
    >
      <View style={styles.leftColumnLabelStackable}>{leftColumnLabel}</View>
      <View style={styles.rightColumnLabelStackable}>{rightColumnLabel}</View>
      <SafeAreaView style={{ ...StyleSheet.absoluteFillObject }}>
        <FlatList
          contentContainerStyle={{
            alignItems: 'flex-end',
            paddingRight: styles.largeGutter,
          }}
          data={useItems()}
          numColumns={twoColumns ? 2 : 1}
          renderItem={({ item }) => <>{item}</>}
          keyExtractor={(_item, index) => `${index}`}
        />
      </SafeAreaView>
    </Animated.View>
  )
}
