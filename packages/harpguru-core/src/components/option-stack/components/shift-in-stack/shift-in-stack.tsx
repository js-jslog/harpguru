import Animated, {
  cond,
  eq,
  sub,
  Value,
  Node,
  add,
} from 'react-native-reanimated'
import { TouchableOpacity } from 'react-native-gesture-handler'
import React from 'react'
import { AntDesign } from '@expo/vector-icons'

import { getStyles } from '../../utils'
import type { OptionStackProps } from '../../types'
import { colors } from '../../../../styles'

type Props = OptionStackProps & {
  readonly activeLayerValue: Value<number>
}

type PointerProperties = {
  readonly prevInStack: () => void
  readonly nextInStack: () => void
  readonly prevPointerEvents: Node<'none' | 'auto'>
  readonly nextPointerEvents: Node<'none' | 'auto'>
  readonly prevPointerOpacity: Node<number>
  readonly nextPointerOpacity: Node<number>
}

const usePointerProperties = (props: Props): PointerProperties => {
  const { stackPropsz, activeLayerValue } = props
  const prevInStack = (): void => {
    const setValue = sub(activeLayerValue, 1)
    activeLayerValue.setValue(setValue)
  }
  const nextInStack = (): void => {
    const setValue = add(activeLayerValue, 1)
    activeLayerValue.setValue(setValue)
  }
  const prevPointerEvents = cond(eq(activeLayerValue, 0), 'none', 'auto')
  const nextPointerEvents = cond(
    eq(activeLayerValue, stackPropsz.length - 1),
    'none',
    'auto'
  )
  const prevPointerOpacity = cond(eq(activeLayerValue, 0), 0.2, 1)
  const nextPointerOpacity = cond(
    eq(activeLayerValue, stackPropsz.length - 1),
    0.2,
    1
  )

  return {
    prevInStack,
    nextInStack,
    prevPointerEvents,
    nextPointerEvents,
    prevPointerOpacity,
    nextPointerOpacity,
  }
}

export const PreviousInStack = (props: Props): React.ReactElement => {
  const {
    prevInStack,
    prevPointerEvents,
    prevPointerOpacity,
  } = usePointerProperties(props)
  const styles = getStyles()
  return (
    <Animated.View
      pointerEvents={prevPointerEvents}
      style={[{ opacity: prevPointerOpacity }]}
    >
      <TouchableOpacity onPress={() => prevInStack()}>
        <AntDesign
          name="left"
          size={styles.titleFontSize}
          color={colors.inertOutline}
        />
      </TouchableOpacity>
    </Animated.View>
  )
}

export const NextInStack = (props: Props): React.ReactElement => {
  const {
    nextInStack,
    nextPointerEvents,
    nextPointerOpacity,
  } = usePointerProperties(props)
  const styles = getStyles()
  return (
    <Animated.View
      pointerEvents={nextPointerEvents}
      style={[{ opacity: nextPointerOpacity }]}
    >
      <TouchableOpacity onPress={() => nextInStack()}>
        <AntDesign
          name="right"
          size={styles.titleFontSize}
          color={colors.inertOutline}
        />
      </TouchableOpacity>
    </Animated.View>
  )
}
