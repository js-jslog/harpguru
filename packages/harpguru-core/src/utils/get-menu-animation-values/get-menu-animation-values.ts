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
  menuHiddenScale,
  menuScaleTranslationFactor,
  menuHiddenYOffsetFactor,
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
  const stashYDirection = stashPosition === MenuStashPosition.Top ? -UP : DOWN

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

  const menuXValue = interpolate(stashMenuTiming, {
    inputRange: [0, 1],
    outputRange: [
      0,
      multiply(
        sub(
          deviceLongSide,
          multiply(deviceLongSide, menuScaleTranslationFactor)
        ),
        stashXDirection
      ),
    ],
  })
  const menuYValue = interpolate(stashMenuTiming, {
    inputRange: [0, 1],
    outputRange: [
      0,
      multiply(
        multiply(deviceShortSide, menuHiddenYOffsetFactor),
        menuScaleTranslationFactor,
        stashYDirection
      ),
    ],
  })
  const labelXValue = interpolate(hideLabelTiming, {
    inputRange: [0, 1],
    outputRange: [
      0,
      multiply(getScaledMenuLabelProtrusion(), stashXDirection),
    ],
  })
  const slideX = add(menuXValue, labelXValue)
  const slideY = menuYValue
  const scale = interpolate(stashMenuTiming, {
    inputRange: [0, 1],
    outputRange: [1, menuHiddenScale],
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
    inputRange: [menuHiddenScale, 0.4],
    outputRange: [divide(1, menuHiddenScale), 0],
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
