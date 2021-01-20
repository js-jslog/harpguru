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

export const OptionStackPrevious = (
  props: OptionStackProps & WithStateValue & WithTransition
): React.ReactElement => {
  const {
    prevInStack,
    prevPointerEvents,
    prevPointerOpacity,
  } = useOptionStackPointerProperties(props)
  const styles = getOptionStyles()
  return (
    <Animated.View
      pointerEvents={prevPointerEvents}
      style={[{ opacity: prevPointerOpacity }]}
    >
      <TouchableOpacity onPress={prevInStack}>
        <AntDesign
          name="left"
          size={styles.titleFontSize}
          color={colors.inertOutline}
        />
      </TouchableOpacity>
    </Animated.View>
  )
}
