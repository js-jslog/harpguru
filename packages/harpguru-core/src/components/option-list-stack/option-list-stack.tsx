import { withTimingTransition } from 'react-native-redash'
import { cond, Easing, eq, Value } from 'react-native-reanimated'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { Dimensions, View, StyleSheet } from 'react-native'
import React from 'react'
import type { DegreeIds } from 'harpparts'
import { AntDesign } from '@expo/vector-icons'

import { OptionListTitle } from '../option-list-title'
import { OptionList } from '../option-list'
import type { Item } from '../option-list'
import { colors, getSizes } from '../../styles'

// TODO: Find a way to improve this. It needs to be able to
// accept lists which each have different callback parameter types,
// but without becoming too clunky. I don't really mind having all of
// the possible types listed here and guarded for but it's not ideal.
// The `string` version doesn't have any application yet, it's just
// to confirm that I've found *an* approach.
type OptionListStackProps = {
  readonly stackPropsz: ReadonlyArray<
    OptionListPropsDegreeBuffer | OptionListPropsString
  >
}

type OptionListPropsDegreeBuffer = OptionListProps<ReadonlyArray<DegreeIds>>
type OptionListPropsString = OptionListProps<string>

type OptionListProps<T> = {
  readonly title: string
  readonly items: ReadonlyArray<Item<T>>
  readonly itemTapHandler: (arg0: T) => void
}

const OptionListStackLocal = ({
  stackPropsz,
}: OptionListStackProps): React.ReactElement => {
  const animationDuration = 300
  const animationValue = new Value<number>(0)
  const transitionValue = withTimingTransition(animationValue, {
    duration: animationDuration,
    easing: Easing.inOut(Easing.ease),
  })

  const optionListTitleComponents = stackPropsz.map(
    (stackProps, index, array) => {
      return (
        <OptionListTitle
          title={stackProps.title}
          animatedValue={transitionValue}
          selfIndex={index}
          totalItems={array.length}
          key={index}
        />
      )
    }
  )

  function isForString(
    x: OptionListPropsString | OptionListPropsDegreeBuffer
  ): x is OptionListPropsString {
    return typeof x.title === 'string'
  }

  const optionListComponents = stackPropsz.map((items, index, array) => {
    if (isForString(items)) {
      const i = items as OptionListPropsString
      return (
        <OptionList
          items={i.items}
          animatedValue={transitionValue}
          selfIndex={index}
          totalItems={array.length}
          tapHandler={i.itemTapHandler}
          key={index}
        />
      )
    } else {
      const i = items as OptionListPropsDegreeBuffer
      return (
        <OptionList
          items={i.items}
          animatedValue={transitionValue}
          selfIndex={index}
          totalItems={array.length}
          tapHandler={i.itemTapHandler}
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
  // TODO: name, format and or comment this to explain what it's doing and
  // why it works. Explain that the 4 is intrinsically tied to the flex
  // ratios of 1 : 3 currently selected. If these change then there'll be
  // trouble, but there's absolutely no reason to change them now. In fact,
  // flex isn't even required here now I think. The elements are basically
  // absolutely positioned.
  const rotatedContentVerticalOffset = (deviceHeight - deviceWidth / 4) / 2
  const styles = StyleSheet.create({
    titlesectionrotator: {
      flex: 1,
      justifyContent: 'flex-start',
      alignItems: 'center',
      transform: [{ rotate: '-90deg' }],
    },
    titlesectionspacer: {
      paddingTop: rotatedContentVerticalOffset + sizes['11'],
      width: deviceHeight,
      justifyContent: 'space-between',
      flexDirection: 'row',
    },
    titlewrapper: {
      position: 'absolute',
      alignSelf: 'center',
    },
    titletext: {
      fontSize: sizes['9'],
    },
    listsection: {
      flex: 3,
    },
  })
  const toggleVisibleOption = (): void => {
    const setValue = cond(eq(animationValue, 1), 0, 1)
    animationValue.setValue(setValue)
  }
  return (
    <>
      <View style={styles.titlesectionrotator}>
        <View style={styles.titlesectionspacer}>
          <View>
            <TouchableOpacity onPress={() => toggleVisibleOption()}>
              <AntDesign
                name="left"
                size={sizes['9']}
                color={colors.inertOutline}
              />
            </TouchableOpacity>
          </View>
          <View>{optionListTitleComponents}</View>
          <View>
            <TouchableOpacity onPress={() => toggleVisibleOption()}>
              <AntDesign
                name="right"
                size={sizes['9']}
                color={colors.inertOutline}
              />
            </TouchableOpacity>
          </View>
        </View>
      </View>
      <View style={styles.listsection}>{optionListComponents}</View>
    </>
  )
}

const areEqual = (
  { stackPropsz: prevProps }: OptionListStackProps,
  { stackPropsz: nextProps }: OptionListStackProps
) => {
  // TODO: Add more tests
  // Tests whether another list has been added to the stack
  if (prevProps.length !== nextProps.length) return false
  // If we want to include this test then we need to ensure that React.useCallback
  // wraps the tap handlers being passed in.
  if (prevProps[0].itemTapHandler !== nextProps[0].itemTapHandler) return false
  return true
}

export const OptionListStack = React.memo(OptionListStackLocal, areEqual)
