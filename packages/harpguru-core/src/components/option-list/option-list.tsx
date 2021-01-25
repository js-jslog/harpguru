import Animated from 'react-native-reanimated'
import { FlatList } from 'react-native-gesture-handler'
import { StyleSheet, View, SafeAreaView } from 'react-native'
import React from 'react'

import { getOptionSizes } from '../../utils'
import type { WithTransition } from '../../types'
import { getWindowDimensions } from '../../packages/get-window-dimensions'

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
  const { largeGutter, itemWidth, internalGutter } = getOptionSizes()
  const { longEdge } = getWindowDimensions()
  const { common, left, right } = StyleSheet.create({
    common: {
      position: 'absolute',
      height: '100%',
      justifyContent: 'center',
    },
    left: {
      right: largeGutter + itemWidth * 2 + internalGutter,
      alignItems: 'flex-end',
    },
    right: {
      left: longEdge - largeGutter + internalGutter,
      alignItems: 'flex-start',
    },
  })

  const leftColumnLabel = useLeftColumnLabel()
  const rightColumnLabel = useRightColumnLabel()

  return (
    <Animated.View
      style={{
        ...StyleSheet.absoluteFillObject,
        opacity: transitionValue,
      }}
    >
      <View style={[common, left]}>{leftColumnLabel}</View>
      <View style={[common, right]}>{rightColumnLabel}</View>
      <SafeAreaView style={{ ...StyleSheet.absoluteFillObject }}>
        <FlatList
          contentContainerStyle={{
            alignItems: 'flex-end',
            paddingRight: largeGutter,
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
