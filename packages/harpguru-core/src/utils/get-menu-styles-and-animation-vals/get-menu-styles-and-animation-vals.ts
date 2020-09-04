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
  readonly menuOpacity: Node<number>
  readonly labelCounterScale: Node<number>
}

export const getMenuStylesAndAnimationVals = (
  hideMenu: boolean,
  hideLabel: boolean,
  stashDirection: 'TOP' | 'BOTTOM'
): StyleAndAnimationVals => {
  const sizes = getSizes()
  const {
    labelProtrusion: unscaledLabelProtrusion,
    9: fontSize,
    9: borderRadius,
    overlayOpacity,
  } = sizes
  const { inertOutline: labelTextColor } = colors
  const outwardXMultiplier = 1
  const outwardYMultiplier = stashDirection === 'TOP' ? -1 : 1
  const labelRotation = '90deg'

  const { width: windowWidth, height: windowHeight } = Dimensions.get('window')
  const deviceShortSide =
    windowWidth < windowHeight ? windowWidth : windowHeight
  const deviceLongSide = windowWidth > windowHeight ? windowWidth : windowHeight

  const menuHiddenScale = 0.4 // 0.5 would have both tabs fill exactly half the screen height
  const menuHiddenYOffsetFactor = 0.8
  const menuScaleTranslationFactor = (1 - menuHiddenScale) / 2

  const labelProtrusion = unscaledLabelProtrusion / menuHiddenScale

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
      width: deviceShortSide,
    },
    text: {
      fontSize,
      color: labelTextColor,
    },
  })

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
  const menuOpacity = interpolate(hideMenuVal, {
    inputRange: [0, 1],
    outputRange: [overlayOpacity, 1],
  })

  // Label animation values
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
    menuOpacity,
    labelCounterScale,
  }
}
