import { withTimingTransition } from 'react-native-redash'
import Animated, { cond, Easing, eq, Value } from 'react-native-reanimated'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { Dimensions, View, StyleSheet } from 'react-native'
import React from 'react'
import { AntDesign } from '@expo/vector-icons'

import { colors, getSizes } from '../../styles'

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
          animatedValue={transitionValue}
          selfIndex={index}
          totalItems={array.length}
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
          animatedValue={transitionValue}
          selfIndex={index}
          totalItems={array.length}
          itemTapHandler={i.itemTapHandler}
          key={index}
        />
      )
    } else {
      const i = items as OptionProps_Scales
      return (
        <List
          items={i.items}
          animatedValue={transitionValue}
          selfIndex={index}
          totalItems={array.length}
          itemTapHandler={i.itemTapHandler}
          key={index}
        />
      )
    }
  })

  const sizes = getSizes()
  // TODO: turn this in to a util since it's used elsewhere
  const { width: windowWidth, height: windowHeight } = Dimensions.get('window')
  const deviceHeight = windowHeight < windowWidth ? windowHeight : windowWidth
  const deviceWidth = windowHeight < windowWidth ? windowWidth : windowHeight
  const styles = StyleSheet.create({
    titleSection: {
      transform: [{ rotate: '-90deg' }],
      paddingTop: sizes['11'],
      width: deviceHeight,
      justifyContent: 'space-between',
      flexDirection: 'row',
    },
    listSection: {
      fontSize: sizes['9'],
      position: 'absolute',
      top: 0,
      right: 0,
      // This is based on the offset of the titlesectionspacer
      // and the font size of the title text together with the
      // font size again as a spacer. It would be nice to tie
      // these sizes together somehow.
      width: deviceWidth - sizes['11'] - sizes['9'] - sizes['9'],
      height: deviceHeight,
    },
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
              size={sizes['9']}
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
              size={sizes['9']}
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
