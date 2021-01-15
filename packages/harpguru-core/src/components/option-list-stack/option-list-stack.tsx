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
import { getSizes } from '../../styles'

type OptionListStackProps = {
  readonly stackPropsz: ReadonlyArray<OptionListProps<ReadonlyArray<DegreeIds>>>
}

type OptionListProps<T> = {
  readonly title: string
  readonly items: ReadonlyArray<Item<T>>
  readonly itemTapHandler: (arg0: T) => void
}

export const OptionListStack = ({
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

  const optionListComponents = stackPropsz.map((items, index, array) => {
    return (
      <OptionList
        items={items.items}
        animatedValue={transitionValue}
        selfIndex={index}
        totalItems={array.length}
        tapHandler={items.itemTapHandler}
        key={index}
      />
    )
  })

  const sizes = getSizes()
  // TODO: turn this in to a util since it's used elsewhere
  const { width: windowWidth, height: windowHeight } = Dimensions.get('window')
  const deviceHeight = windowHeight < windowWidth ? windowHeight : windowWidth
  const styles = StyleSheet.create({
    titlesectionrotator: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      transform: [{ rotate: '-90deg' }],
    },
    titlesectionspacer: {
      height: 20,
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
              <AntDesign name="left" size={sizes['9']} color="black" />
            </TouchableOpacity>
          </View>
          <View>{optionListTitleComponents}</View>
          <View>
            <TouchableOpacity onPress={() => toggleVisibleOption()}>
              <AntDesign name="right" size={sizes['9']} color="black" />
            </TouchableOpacity>
          </View>
        </View>
      </View>
      <View style={styles.listsection}>{optionListComponents}</View>
    </>
  )
}
