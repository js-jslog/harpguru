import { withTimingTransition } from 'react-native-redash'
import Animated, { cond, Easing, eq, Value } from 'react-native-reanimated'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { View } from 'react-native'
import React from 'react'
import { AntDesign } from '@expo/vector-icons'

import { colors } from '../../styles'

import { getStyles } from './utils'
import { useInterpolateTransitionValue } from './hooks'
import { Title, List } from './components'

import type {
  OptionProps_Scales,
  OptionProps_Dummy,
  OptionStackProps,
} from './types'

const OptionStackLocal = ({
  stackPropsz,
}: OptionStackProps): React.ReactElement => {
  const animationDuration = 300
  const animationValue = new Value<number>(0)
  const transitionValue = withTimingTransition(animationValue, {
    duration: animationDuration,
    easing: Easing.inOut(Easing.ease),
  })

  const optionListTitleComponents = stackPropsz.map(
    (stackProps, index, array) => {
      return (
        <Title
          title={stackProps.title}
          animationValue={useInterpolateTransitionValue(
            array.length,
            index,
            transitionValue
          )}
          key={index}
        />
      )
    }
  )

  function isDummy(
    x: OptionProps_Scales | OptionProps_Dummy
  ): x is OptionProps_Dummy {
    return x.title === 'TOTAL_DUMMY'
  }

  const optionListComponents = stackPropsz.map((items, index, array) => {
    if (isDummy(items)) {
      const i = items as OptionProps_Dummy
      return (
        <List
          items={i.items}
          animationValue={useInterpolateTransitionValue(
            array.length,
            index,
            transitionValue
          )}
          itemTapHandler={i.itemTapHandler}
          key={index}
        />
      )
    } else {
      const i = items as OptionProps_Scales
      return (
        <List
          items={i.items}
          animationValue={useInterpolateTransitionValue(
            array.length,
            index,
            transitionValue
          )}
          itemTapHandler={i.itemTapHandler}
          key={index}
        />
      )
    }
  })

  const toggleVisibleOption = (): void => {
    const setValue = cond(eq(animationValue, 1), 0, 1)
    animationValue.setValue(setValue)
  }
  const prevPointerEvents = cond(eq(animationValue, 0), 'none', 'auto')
  const nextPointerEvents = cond(
    eq(animationValue, stackPropsz.length - 1),
    'none',
    'auto'
  )
  const prevPointerOpacity = cond(eq(animationValue, 0), 0.2, 1)
  const nextPointerOpacity = cond(
    eq(animationValue, stackPropsz.length - 1),
    0.2,
    1
  )
  const styles = getStyles()
  return (
    <>
      <View style={styles.titleSection}>
        <Animated.View
          pointerEvents={prevPointerEvents}
          style={[{ opacity: prevPointerOpacity }]}
        >
          <TouchableOpacity onPress={() => toggleVisibleOption()}>
            <AntDesign
              name="left"
              size={styles.titleFontSize}
              color={colors.inertOutline}
            />
          </TouchableOpacity>
        </Animated.View>
        <View>{optionListTitleComponents}</View>
        <Animated.View
          pointerEvents={nextPointerEvents}
          style={[{ opacity: nextPointerOpacity }]}
        >
          <TouchableOpacity onPress={() => toggleVisibleOption()}>
            <AntDesign
              name="right"
              size={styles.titleFontSize}
              color={colors.inertOutline}
            />
          </TouchableOpacity>
        </Animated.View>
      </View>
      <View style={styles.listSection}>{optionListComponents}</View>
    </>
  )
}

const areEqual = (
  { stackPropsz: prevProps }: OptionStackProps,
  { stackPropsz: nextProps }: OptionStackProps
) => {
  // TODO: Add more tests
  // Tests whether another list has been added to the stack
  if (prevProps.length !== nextProps.length) return false
  // If we want to include this test then we need to ensure that React.useCallback
  // wraps the tap handlers being passed in.
  if (prevProps[0].itemTapHandler !== nextProps[0].itemTapHandler) return false
  return true
}

export const OptionStack = React.memo(OptionStackLocal, areEqual)
