import Animated from 'react-native-reanimated'
import { StyleSheet } from 'react-native'
import React from 'react'

import { getScaledMenuLabelProtrusion } from '../../utils'
import type { MenuProps, ChildrenProps } from '../../types'
import { colors, getSizes } from '../../styles'
import { useMenuAnimationValues } from '../../hooks'

export const Menu = ({
  isMenuStashed,
  isLabelHidden,
  stashPosition,
  overrideBackgroundColor = false,
  children,
}: MenuProps & ChildrenProps): React.ReactElement => {
  const {
    slideX,
    slideY,
    scale,
    backgroundColor,
    opacity,
  } = useMenuAnimationValues(isMenuStashed, isLabelHidden, stashPosition)
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
            backgroundColor: overrideBackgroundColor
              ? colors.inertOutline
              : backgroundColor,
            opacity: opacity,
          },
        ]}
      >
        {children}
      </Animated.View>
    </Animated.View>
  )
}
