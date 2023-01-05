import Animated, {
  useAnimatedStyle,
  useAnimatedProps,
} from 'react-native-reanimated'
import { TouchableOpacity } from 'react-native-gesture-handler'
import React from 'react'
import { AntDesign } from '@expo/vector-icons'

import { getColors } from '../../utils'
import type { WithStateValue, WithTransition } from '../../types'
import { useOptionSizes } from '../../hooks'

import { useOptionStackPointerProperties } from './hooks'

export type OptionStackPointerProps = WithStateValue &
  WithTransition & {
    readonly stackLength: number
    readonly direction: 'NEXT' | 'PREVIOUS'
  }

export const OptionStackPointer = (
  props: OptionStackPointerProps
): React.ReactElement => {
  const {
    nextInStack,
    nextPointerEvents,
    nextPointerOpacity,
    prevInStack,
    prevPointerEvents,
    prevPointerOpacity,
  } = useOptionStackPointerProperties(props)
  const { smallGutter, largeFont } = useOptionSizes()

  const colors = getColors()

  const { direction } = props
  const opacity = direction === 'NEXT' ? nextPointerOpacity : prevPointerOpacity
  const onPress = direction === 'NEXT' ? nextInStack : prevInStack
  const icon = direction === 'NEXT' ? 'up' : 'down'

  const animatedProps = useAnimatedProps(() => {
    const pointerEvents =
      direction === 'NEXT' ? nextPointerEvents.value : prevPointerEvents.value
    return {
      pointerEvents,
    }
  })
  const animatedStyle = useAnimatedStyle(() => {
    return {
      opacity: opacity.value,
      position: 'absolute',
      left: smallGutter,
      top: direction === 'NEXT' ? smallGutter : undefined,
      bottom: direction === 'NEXT' ? undefined : smallGutter,
    }
  })

  return (
    <Animated.View animatedProps={animatedProps} style={[animatedStyle]}>
      <TouchableOpacity onPress={onPress}>
        <AntDesign name={icon} size={largeFont} color={colors.inertOutline} />
      </TouchableOpacity>
    </Animated.View>
  )
}
