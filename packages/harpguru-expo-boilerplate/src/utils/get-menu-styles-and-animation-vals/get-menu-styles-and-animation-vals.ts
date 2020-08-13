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

import { sizes, colors } from '../../styles'

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
  readonly menuSlideTranslation: Node<number>
  readonly menuScale: Node<number>
  readonly menuBackgroundColor: Node<number>
  readonly labelOpacity: Node<number>
  readonly labelCounterScale: Node<number>
}

export const getMenuStylesAndAnimationVals = (
  hideMenu: boolean,
  hideLabel: boolean,
  stashDirection: 'RIGHT' | 'LEFT'
): StyleAndAnimationVals => {
  const { 10: labelProtrusion, 9: fontSize, 7: borderRadius } = sizes
  const outwardDirectionMultiplier = stashDirection === 'RIGHT' ? 1 : -1
  const labelRotation = stashDirection === 'RIGHT' ? '90deg' : '-90deg'

  const styles = StyleSheet.create({
    animated: {
      ...StyleSheet.absoluteFillObject,
      zIndex: 10,
    },
    overlay: {
      ...StyleSheet.absoluteFillObject,
      left: stashDirection === 'RIGHT' ? labelProtrusion * -1 : 0,
      right: stashDirection === 'LEFT' ? labelProtrusion * -1 : 0,
      flexDirection: 'row',
      justifyContent: stashDirection === 'RIGHT' ? 'flex-start' : 'flex-end',
      borderRadius,
      opacity: 0.7,
    },
    mainContents: {
      ...StyleSheet.absoluteFillObject,
      flexDirection: 'row',
      left: stashDirection === 'RIGHT' ? labelProtrusion : 0,
      right: stashDirection === 'LEFT' ? labelProtrusion : 0,
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
  const guaranteeOffScreenWidth =
    windowWidth > windowHeight ? windowWidth : windowHeight

  // Menu animation values
  const hideMenuTranslation = interpolate(hideMenuVal, {
    inputRange: [0, 1],
    outputRange: [
      0,
      multiply(
        sub(guaranteeOffScreenWidth, multiply(guaranteeOffScreenWidth, 0.25)),
        outwardDirectionMultiplier
      ),
    ],
  })
  const hideLabelTranslation = interpolate(hideLabelVal, {
    inputRange: [0, 1],
    outputRange: [0, multiply(labelProtrusion, outwardDirectionMultiplier)],
  })
  const menuSlideTranslation = add(hideMenuTranslation, hideLabelTranslation)
  const menuScale = interpolate(hideMenuVal, {
    inputRange: [0, 1],
    outputRange: [1, 0.5],
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
    inputRange: [0.5, 1],
    outputRange: [1, 0.5],
  })

  return {
    styles,
    menuSlideTranslation,
    menuScale,
    menuBackgroundColor,
    labelOpacity,
    labelCounterScale,
  }
}
