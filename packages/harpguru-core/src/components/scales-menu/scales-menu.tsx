import { useState } from 'reactn'
import { useTimingTransition } from 'react-native-redash'
import Animated, { Easing, interpolate } from 'react-native-reanimated'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { Dimensions, View, StyleSheet } from 'react-native'
import React from 'react'
import { getScale, getScaleIds } from 'harpparts'
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
  const scales = getScaleIds().map((id) => getScale(id))
  // TODO: turn this in to a util since it's used elsewhere
  const { width: windowWidth, height: windowHeight } = Dimensions.get('window')
  const deviceHeight = windowHeight < windowWidth ? windowHeight : windowWidth

  const { isMenuStashed } = menuProps
  const dispatchAndFlushScaleToggles = useDispatchAndFlushScaleToggles({
    isMenuStashed: isMenuStashed,
  })

  enum VisibleOption {
    Scales,
    Chords,
  }
  const [visibleOption, setVisibleOption] = useState<VisibleOption>(
    VisibleOption.Scales
  )
  const animationDuration = 300
  const scalesTitleVisibleTiming = useTimingTransition(
    visibleOption === VisibleOption.Scales,
    {
      duration: animationDuration,
      easing: Easing.inOut(Easing.ease),
    }
  )
  const scalesTitleOpacity = interpolate(scalesTitleVisibleTiming, {
    inputRange: [0, 1],
    outputRange: [0, 1],
  })
  const chordsTitleOpacity = interpolate(scalesTitleVisibleTiming, {
    inputRange: [0, 1],
    outputRange: [1, 0],
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
  const toggleVisibleOption = (): void => {
    setVisibleOption((visibleOption) => {
      if (visibleOption === VisibleOption.Scales) return VisibleOption.Chords
      return VisibleOption.Scales
    })
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
            <View>
              <OptionListTitle
                title={'Scales'}
                animatedValue={chordsTitleOpacity}
              />
              <OptionListTitle
                title={'Chords'}
                animatedValue={scalesTitleOpacity}
              />
            </View>
            <View>
              <TouchableOpacity onPress={() => toggleVisibleOption()}>
                <AntDesign name="right" size={sizes['9']} color="black" />
              </TouchableOpacity>
            </View>
          </View>
        </View>
        <Animated.View style={styles.listsection}>
          <OptionList
            scales={scales}
            tapHandler={(arg0) => dispatchAndFlushScaleToggles(arg0)}
          />
        </Animated.View>
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
