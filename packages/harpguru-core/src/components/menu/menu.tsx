import Animated from 'react-native-reanimated'
import { StyleSheet } from 'react-native'
import React from 'react'
import { useDimensions } from '@react-native-community/hooks'

import type { MenuProps, ChildrenProps } from '../../types'
import { getSizes } from '../../styles'
import {
  useMenuAnimationValues,
  useScaledMenuLabelProtrusion,
} from '../../hooks'

export const Menu = ({
  isMenuStashed,
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
  } = useMenuAnimationValues(isMenuStashed, isLabelHidden, stashPosition)
  const scaledLabelProtrusion = useScaledMenuLabelProtrusion()

  const { 9: borderRadius } = getSizes(useDimensions().window)
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
            backgroundColor,
            opacity: opacity,
          },
        ]}
      >
        {children}
      </Animated.View>
    </Animated.View>
  )
}
