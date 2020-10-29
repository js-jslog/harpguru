import Animated from 'react-native-reanimated'
import { StyleSheet } from 'react-native'
import React from 'react'

import {
  getScaledMenuLabelProtrusion,
  getMenuAnimationValues,
} from '../../utils'
import type { MenuProps, ChildrenProps } from '../../types'
import { getSizes } from '../../styles'

export const Menu = ({
  isMenuHidden,
  isLabelHidden,
  stashPosition,
  children,
}: MenuProps & ChildrenProps): React.ReactElement => {
  const {
    slideX,
    slideY,
    scale,
    backgroundColor,
    opacity,
  } = getMenuAnimationValues(isMenuHidden, isLabelHidden, stashPosition)
  const scaledLabelProtrusion = getScaledMenuLabelProtrusion()

  const { 9: borderRadius } = getSizes()
  const styles = StyleSheet.create({
    animated: {
      ...StyleSheet.absoluteFillObject,
      zIndex: 10,
    },
    overlay: {
      ...StyleSheet.absoluteFillObject,
      left: scaledLabelProtrusion * -1,
      flexDirection: 'row',
      justifyContent: 'flex-start',
      borderRadius,
    },
  })

  return (
    <Animated.View
      style={[
        styles.animated,
        {
          transform: [
            { translateX: slideX },
            { translateY: slideY },
            { scale: scale },
          ],
        },
      ]}
    >
      <Animated.View
        style={[
          styles.overlay,
          {
            backgroundColor: backgroundColor,
            opacity: opacity,
          },
        ]}
      >
        {children}
      </Animated.View>
    </Animated.View>
  )
}
