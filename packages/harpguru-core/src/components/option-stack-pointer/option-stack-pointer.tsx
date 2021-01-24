import Animated from 'react-native-reanimated'
import { TouchableOpacity } from 'react-native-gesture-handler'
import React from 'react'
import { AntDesign } from '@expo/vector-icons'

import { getOptionStyles } from '../../utils'
import type { WithStateValue, WithTransition } from '../../types'
import { colors } from '../../styles'

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
  const styles = getOptionStyles()

  const { direction } = props
  const pointerEvents =
    direction === 'NEXT' ? nextPointerEvents : prevPointerEvents
  const opacity = direction === 'NEXT' ? nextPointerOpacity : prevPointerOpacity
  const positionStyle =
    direction === 'NEXT' ? styles.stackNext : styles.stackPrevious
  const onPress = direction === 'NEXT' ? nextInStack : prevInStack
  const icon = direction === 'NEXT' ? 'up' : 'down'

  return (
    <Animated.View
      pointerEvents={pointerEvents}
      style={[{ opacity }, positionStyle]}
    >
      <TouchableOpacity onPress={onPress}>
        <AntDesign
          name={icon}
          size={styles.largeFont}
          color={colors.inertOutline}
        />
      </TouchableOpacity>
    </Animated.View>
  )
}
