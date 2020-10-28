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

import { MenuStashPosition } from '../../types'
import { getSizes, colors } from '../../styles'
import {
  menuHiddenScale,
  menuScaleTranslationFactor,
  menuHiddenYOffsetFactor,
  overlayOpacity,
} from '../../constants'

type StyleAndAnimationVals = {
  readonly menuSlideXTranslation: Node<number>
  readonly menuSlideYTranslation: Node<number>
  readonly menuScale: Node<number>
  readonly menuBackgroundColor: Node<number>
  readonly menuOpacity: Node<number>
  readonly labelCounterScale: Node<number>
}

export const getScaledMenuLabelProtrusion = (): number => {
  const { labelProtrusion: unscaledLabelProtrusion } = getSizes()
  const scaledLabelProtrusion = unscaledLabelProtrusion / menuHiddenScale
  return scaledLabelProtrusion
}

export const getMenuAnimationValues = (
  hideMenu: boolean,
  hideLabel: boolean,
  stashPosition: MenuStashPosition
): StyleAndAnimationVals => {
  const outwardXMultiplier = 1
  const outwardYMultiplier = stashPosition === MenuStashPosition.Top ? -1 : 1

  const { width: windowWidth, height: windowHeight } = Dimensions.get('window')
  const deviceShortSide =
    windowWidth < windowHeight ? windowWidth : windowHeight
  const deviceLongSide = windowWidth > windowHeight ? windowWidth : windowHeight

  // Animation values
  const hideMenuVal = useTimingTransition(hideMenu, {
    duration: 300,
    easing: Easing.inOut(Easing.ease),
  })
  const hideLabelVal = useTimingTransition(hideLabel, {
    duration: 300,
    easing: Easing.inOut(Easing.ease),
  })

  // Menu animation values
  const hideMenuXTranslation = interpolate(hideMenuVal, {
    inputRange: [0, 1],
    outputRange: [
      0,
      multiply(
        sub(
          deviceLongSide,
          multiply(deviceLongSide, menuScaleTranslationFactor)
        ),
        outwardXMultiplier
      ),
    ],
  })
  const hideMenuYTranslation = interpolate(hideMenuVal, {
    inputRange: [0, 1],
    outputRange: [
      0,
      multiply(
        multiply(deviceShortSide, menuHiddenYOffsetFactor),
        menuScaleTranslationFactor,
        outwardYMultiplier
      ),
    ],
  })
  const hideLabelTranslation = interpolate(hideLabelVal, {
    inputRange: [0, 1],
    outputRange: [
      0,
      multiply(getScaledMenuLabelProtrusion(), outwardXMultiplier),
    ],
  })
  const menuSlideXTranslation = add(hideMenuXTranslation, hideLabelTranslation)
  const menuSlideYTranslation = hideMenuYTranslation
  const menuScale = interpolate(hideMenuVal, {
    inputRange: [0, 1],
    outputRange: [1, menuHiddenScale],
  })
  const menuBackgroundColor = interpolateColor(hideMenuVal, {
    inputRange: [0, 1],
    outputRange: [colors.pageColor, colors.homeRowsColor],
  })
  const menuOpacity = interpolate(hideMenuVal, {
    inputRange: [0, 1],
    outputRange: [overlayOpacity, 1],
  })

  // Label animation values
  const labelCounterScale = interpolate(menuScale, {
    inputRange: [menuHiddenScale, 0.4],
    outputRange: [divide(1, menuHiddenScale), 0],
    extrapolate: Extrapolate.CLAMP,
  })

  return {
    menuSlideXTranslation,
    menuSlideYTranslation,
    menuScale,
    menuBackgroundColor,
    menuOpacity,
    labelCounterScale,
  }
}
