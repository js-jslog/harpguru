import { withTimingTransition } from 'react-native-redash'
import { cond, Easing, eq, Value } from 'react-native-reanimated'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { Dimensions, View, StyleSheet } from 'react-native'
import React from 'react'
import { getScale, getScaleIds, ScaleCategory } from 'harpparts'
import { AntDesign, MaterialIcons } from '@expo/vector-icons'

import { OptionListTitle } from '../option-list-title'
import { OptionList } from '../option-list'
import { MenuOpenButton } from '../menu-open-button'
import { MenuFace } from '../menu-face'
import { Menu } from '../menu'
import { MenuProps } from '../../types'
import { colors, getSizes } from '../../styles'

import { useDispatchAndFlushScaleToggles } from './hooks'

export const ScalesMenu = (menuProps: MenuProps): React.ReactElement => {
  const sizes = getSizes()
  // TODO: turn this in to a util since it's used elsewhere
  const { width: windowWidth, height: windowHeight } = Dimensions.get('window')
  const deviceHeight = windowHeight < windowWidth ? windowHeight : windowWidth

  const { isMenuStashed } = menuProps

  const animationDuration = 300
  const animationValue = new Value<number>(0)
  const transitionValue = withTimingTransition(animationValue, {
    duration: animationDuration,
    easing: Easing.inOut(Easing.ease),
  })

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
  const titlesList = ['Scales', 'Chords']
  const titlesComponents = titlesList.map((title, index) => {
    const outputRange = index === 1 ? [1, 0] : [0, 1]
    return (
      <OptionListTitle
        title={title}
        animatedValue={transitionValue}
        outputRange={outputRange}
        key={index}
      />
    )
  })
  const scales = getScaleIds()
    .map((id) => getScale(id))
    .filter((scale) => scale.category === ScaleCategory.Scale)
  const chords = getScaleIds()
    .map((id) => getScale(id))
    .filter((scale) => scale.category === ScaleCategory.Chord)
  const dispatchAndFlushScaleToggles = useDispatchAndFlushScaleToggles({
    isMenuStashed: isMenuStashed,
  })
  const listComponents = [scales, chords].map((scale, index) => {
    const outputRange = index === 1 ? [1, 0] : [0, 1]
    return (
      <OptionList
        scales={scale}
        animatedValue={transitionValue}
        outputRange={outputRange}
        tapHandler={(arg0) => dispatchAndFlushScaleToggles(arg0)}
        key={index}
      />
    )
  })
  const toggleVisibleOption = (): void => {
    const setValue = cond(eq(animationValue, 1), 0, 1)
    animationValue.setValue(setValue)
  }
  return (
    <Menu {...menuProps}>
      <MenuFace {...menuProps}>
        <View style={styles.titlesectionrotator}>
          <View style={styles.titlesectionspacer}>
            <View>
              <TouchableOpacity onPress={() => toggleVisibleOption()}>
                <AntDesign name="left" size={sizes['9']} color="black" />
              </TouchableOpacity>
            </View>
            <View>{titlesComponents}</View>
            <View>
              <TouchableOpacity onPress={() => toggleVisibleOption()}>
                <AntDesign name="right" size={sizes['9']} color="black" />
              </TouchableOpacity>
            </View>
          </View>
        </View>
        <View style={styles.listsection}>{listComponents}</View>
      </MenuFace>
      <MenuOpenButton {...menuProps}>
        <MaterialIcons
          name="linear-scale"
          size={sizes['7']}
          color={colors.homeRowsColor}
        />
      </MenuOpenButton>
    </Menu>
  )
}
