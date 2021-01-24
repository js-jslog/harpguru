import Animated from 'react-native-reanimated'
import { TouchableOpacity } from 'react-native-gesture-handler'
import React from 'react'
import { AntDesign } from '@expo/vector-icons'

import { getOptionStyles } from '../../utils'
import type {
  OptionStackProps,
  WithStateValue,
  WithTransition,
} from '../../types'
import { colors } from '../../styles'
import { useOptionStackPointerProperties } from '../../hooks'

export const OptionStackNext = (
  props: OptionStackProps & WithStateValue & WithTransition
): React.ReactElement => {
  const {
    nextInStack,
    nextPointerEvents,
    nextPointerOpacity,
  } = useOptionStackPointerProperties(props)
  const styles = getOptionStyles()
  return (
    <Animated.View
      pointerEvents={nextPointerEvents}
      style={[{ opacity: nextPointerOpacity }, styles.stackNext]}
    >
      <TouchableOpacity onPress={nextInStack}>
        <AntDesign
          name="up"
          size={styles.largeFont}
          color={colors.inertOutline}
        />
      </TouchableOpacity>
    </Animated.View>
  )
}
