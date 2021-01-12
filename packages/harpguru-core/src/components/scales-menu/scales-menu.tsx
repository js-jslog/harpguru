import { useState } from 'reactn'
import { useTimingTransition } from 'react-native-redash'
import Animated, { Easing, interpolate } from 'react-native-reanimated'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import { getScale, getScaleIds } from 'harpparts'
import { MaterialIcons } from '@expo/vector-icons'

import { OptionList } from '../option-list'
import { MenuOpenButton } from '../menu-open-button'
import { MenuFace } from '../menu-face'
import { Menu } from '../menu'
import { MenuProps } from '../../types'
import { colors, getSizes } from '../../styles'

import { useFlushTogglesFromScalesMenu } from './hooks'

export const ScalesMenu = (menuProps: MenuProps): React.ReactElement => {
  const sizes = getSizes()

  const { isMenuStashed } = menuProps
  const rebufferForScale = useFlushTogglesFromScalesMenu({
    isMenuStashed: isMenuStashed,
  })

  const scales = getScaleIds().map((id) => getScale(id))

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
    titlesection: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      transform: [{ rotate: '-90deg' }],
    },
    titlewrapper: {
      position: 'absolute',
    },
    titletext: {
      fontSize: sizes['9'],
    },
    listsection: {
      flex: 3,
    },
  })
  return (
    <Menu {...menuProps}>
      <MenuFace {...menuProps}>
        <View style={styles.titlesection}>
          <Animated.View
            style={[
              styles.titlewrapper,
              {
                opacity: scalesTitleOpacity,
              },
            ]}
          >
            <TouchableOpacity
              onPress={() =>
                setVisibleOption((visibleOption) => {
                  if (visibleOption === VisibleOption.Scales)
                    return VisibleOption.Chords
                  return VisibleOption.Scales
                })
              }
            >
              <Text style={styles.titletext}>Scales</Text>
            </TouchableOpacity>
          </Animated.View>
          <Animated.View
            style={[
              styles.titlewrapper,
              {
                opacity: chordsTitleOpacity,
              },
            ]}
          >
            <TouchableOpacity
              onPress={() =>
                setVisibleOption((visibleOption) => {
                  if (visibleOption === VisibleOption.Scales)
                    return VisibleOption.Chords
                  return VisibleOption.Scales
                })
              }
            >
              <Text style={styles.titletext}>Chords</Text>
            </TouchableOpacity>
          </Animated.View>
        </View>
        <Animated.View style={styles.listsection}>
          <OptionList
            scales={scales}
            tapHandler={(arg0) => rebufferForScale(arg0)}
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
