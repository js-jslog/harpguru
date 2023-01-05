import Animated, {
  interpolate,
  useAnimatedStyle,
} from 'react-native-reanimated'
import { FlatList } from 'react-native-gesture-handler'
import { StyleSheet, View } from 'react-native'
import React from 'react'

import type { OptionLabelProps } from '../option-label'
import type { WithTransition } from '../../types'
import { getWindowDimensions } from '../../packages/get-window-dimensions'
import { useOptionSizes } from '../../hooks'

export type OptionListProps = WithTransition & {
  readonly useItems: () => ReadonlyArray<React.ReactElement>
  readonly twoColumns?: boolean
  readonly useLeftColumnLabel?: () => React.ReactElement<OptionLabelProps>
  readonly useRightColumnLabel?: () => React.ReactElement<OptionLabelProps>
}

export const OptionList = ({
  useItems,
  twoColumns = false,
  useLeftColumnLabel = () => <></>,
  useRightColumnLabel = () => <></>,
  transitionValue,
}: OptionListProps): React.ReactElement => {
  const { largeGutter, itemWidth, internalGutter } = useOptionSizes()
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

  const animatedStyle = useAnimatedStyle(() => {
    const translateX = interpolate(transitionValue.value, [0, 1], [longEdge, 0])
    return {
      transform: [{ translateX }],
      opacity: transitionValue.value,
    }
  })

  return (
    <Animated.View
      style={[{ ...StyleSheet.absoluteFillObject }, animatedStyle]}
    >
      <View style={[common, left]}>{leftColumnLabel}</View>
      <View style={[common, right]}>{rightColumnLabel}</View>
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
    </Animated.View>
  )
}
