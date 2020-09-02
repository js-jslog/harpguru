import { useTimingTransition, interpolateColor } from 'react-native-redash'
import {
  Easing,
  interpolate,
  sub,
  multiply,
  add,
  Node,
} from 'react-native-reanimated'
import { StyleSheet, Dimensions } from 'react-native'
import type { TextStyle, ViewStyle } from 'react-native'

import { getSizes, colors } from '../../styles'

type MenuStyles = {
  readonly animated: ViewStyle
  readonly overlay: ViewStyle
  readonly mainContents: ViewStyle
  readonly rotatedLabel: ViewStyle
  readonly labelAligner: ViewStyle
  readonly text: TextStyle
}

type StyleAndAnimationVals = {
  readonly styles: MenuStyles
  readonly menuSlideXTranslation: Node<number>
  readonly menuSlideYTranslation: Node<number>
  readonly menuScale: Node<number>
  readonly menuBackgroundColor: Node<number>
  readonly labelOpacity: Node<number>
  readonly labelCounterScale: Node<number>
}

export const getMenuStylesAndAnimationVals = (
  hideMenu: boolean,
  hideLabel: boolean,
  stashDirection: 'TOP' | 'BOTTOM'
): StyleAndAnimationVals => {
  const sizes = getSizes()
  const { labelProtrusion, 9: fontSize, 7: borderRadius } = sizes
  const outwardXMultiplier = 1
  const outwardYMultiplier = stashDirection === 'TOP' ? -1 : 1
  const labelRotation = '90deg'

  const styles = StyleSheet.create({
    animated: {
      ...StyleSheet.absoluteFillObject,
      zIndex: 10,
    },
    overlay: {
      ...StyleSheet.absoluteFillObject,
      left: labelProtrusion * -1,
      flexDirection: 'row',
      justifyContent: 'flex-start',
      borderRadius,
      opacity: 0.7,
    },
    mainContents: {
      ...StyleSheet.absoluteFillObject,
      flexDirection: 'row',
      left: labelProtrusion,
    },
    rotatedLabel: {
      overflow: 'visible',
      alignSelf: 'center',
      alignItems: 'center',
      justifyContent: 'center',
      height: labelProtrusion,
      width: labelProtrusion,
      transform: [{ rotate: labelRotation }],
    },
    labelAligner: {
      alignItems: 'center',
      width: 500,
    },
    text: {
      fontSize,
    },
  })

  const menuHiddenScale = 0.5
  const menuScaleTranslationFactor = (1 - menuHiddenScale) / 2

  // Animation values
  const hideMenuVal = useTimingTransition(hideMenu, {
    duration: 400,
    easing: Easing.inOut(Easing.ease),
  })
  const hideLabelVal = useTimingTransition(hideLabel, {
    duration: 400,
    easing: Easing.inOut(Easing.ease),
  })

  const { width: windowWidth, height: windowHeight } = Dimensions.get('window')
  const deviceShortSide =
    windowWidth < windowHeight ? windowWidth : windowHeight
  const deviceLongSide = windowWidth > windowHeight ? windowWidth : windowHeight

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
      multiply(deviceShortSide, menuScaleTranslationFactor, outwardYMultiplier),
    ],
  })
  const hideLabelTranslation = interpolate(hideLabelVal, {
    inputRange: [0, 1],
    outputRange: [0, multiply(labelProtrusion, outwardXMultiplier)],
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

  // Label animation values
  const labelOpacity = interpolate(hideMenuVal, {
    inputRange: [0, 1],
    outputRange: [0, 1],
  })
  const labelCounterScale = interpolate(menuScale, {
    inputRange: [menuHiddenScale, 1],
    outputRange: [1, menuHiddenScale],
  })

  return {
    styles,
    menuSlideXTranslation,
    menuSlideYTranslation,
    menuScale,
    menuBackgroundColor,
    labelOpacity,
    labelCounterScale,
  }
}
