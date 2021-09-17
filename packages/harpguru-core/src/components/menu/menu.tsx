import Animated from 'react-native-reanimated'
import { StyleSheet } from 'react-native'
import React from 'react'

import type { MenuProps, ChildrenProps } from '../../types'
import { useSizes } from '../../styles'
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

  const {
    dynamicSizes: { 9: borderRadius },
  } = useSizes()
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
          // WARNING: the order these transforms are listed is
          // important. I think the size of the translations
          // will be reduced proportionally to the scaling if
          // the scaling is performed first. This is platform
          // independent.
          transform: [
            {
              translateY: slideY,
              translateX: slideX,
              scale: scale,
            },
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
