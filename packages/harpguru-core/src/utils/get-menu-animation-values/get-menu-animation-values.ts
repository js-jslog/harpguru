import { useTimingTransition, interpolateColor } from 'react-native-redash'
import {
  Easing,
  interpolate,
  sub,
  multiply,
  add,
  divide,
  Extrapolate,
} from 'react-native-reanimated'
import type { Node } from 'react-native-reanimated'
import { Dimensions } from 'react-native'

import { getScaledMenuLabelProtrusion } from '../get-scaled-menu-label-protrusion'
import { MenuStashPosition } from '../../types'
import { colors } from '../../styles'
import {
  menuStashedScale,
  menuScaleTranslationFactor,
  menuStashedYOffsetFactor,
  overlayOpacity,
} from '../../constants'

type MenuAnimationValues = {
  readonly slideX: Node<number>
  readonly slideY: Node<number>
  readonly scale: Node<number>
  readonly backgroundColor: Node<number>
  readonly opacity: Node<number>
  readonly labelCounterScale: Node<number>
}

export const getMenuAnimationValues = (
  isMenuStashed: boolean,
  isLabelHidden: boolean,
  stashPosition: MenuStashPosition
): MenuAnimationValues => {
  const RIGHT = 1
  const UP = -1
  const DOWN = 1
  const stashXDirection = RIGHT
  const stashYDirection = stashPosition === MenuStashPosition.Top ? UP : DOWN

  const { width: windowWidth, height: windowHeight } = Dimensions.get('window')
  const deviceShortSide =
    windowWidth < windowHeight ? windowWidth : windowHeight
  const deviceLongSide = windowWidth > windowHeight ? windowWidth : windowHeight

  const stashMenuTiming = useTimingTransition(isMenuStashed, {
    duration: 300,
    easing: Easing.inOut(Easing.ease),
  })
  const hideLabelTiming = useTimingTransition(isLabelHidden, {
    duration: 300,
    easing: Easing.inOut(Easing.ease),
  })

  const scaledFullX = multiply(deviceLongSide, menuScaleTranslationFactor)
  const stashedX = sub(deviceLongSide, scaledFullX)
  const stashXVector = multiply(stashedX, stashXDirection)
  const stashXValue = interpolate(stashMenuTiming, {
    inputRange: [0, 1],
    outputRange: [0, stashXVector],
  })
  const stashedY = multiply(deviceShortSide, menuStashedYOffsetFactor)
  const scaledStashedY = multiply(stashedY, menuScaleTranslationFactor)
  const stashedYVector = multiply(scaledStashedY, stashYDirection)
  const stashYValue = interpolate(stashMenuTiming, {
    inputRange: [0, 1],
    outputRange: [0, stashedYVector],
  })
  const hideLabelVector = multiply(
    getScaledMenuLabelProtrusion(),
    stashXDirection
  )
  const hideXValue = interpolate(hideLabelTiming, {
    inputRange: [0, 1],
    outputRange: [0, hideLabelVector],
  })
  const slideX = add(stashXValue, hideXValue)
  const slideY = stashYValue
  const scale = interpolate(stashMenuTiming, {
    inputRange: [0, 1],
    outputRange: [1, menuStashedScale],
  })
  const backgroundColor = interpolateColor(stashMenuTiming, {
    inputRange: [0, 1],
    outputRange: [colors.pageColor, colors.homeRowsColor],
  })
  const opacity = interpolate(stashMenuTiming, {
    inputRange: [0, 1],
    outputRange: [overlayOpacity, 1],
  })

  const labelCounterScale = interpolate(scale, {
    inputRange: [menuStashedScale, 0.4],
    outputRange: [divide(1, menuStashedScale), 0],
    extrapolate: Extrapolate.CLAMP,
  })

  return {
    slideX,
    slideY,
    scale,
    backgroundColor,
    opacity,
    labelCounterScale,
  }
}
