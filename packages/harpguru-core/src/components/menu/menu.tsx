import { useGlobal } from 'reactn'
import Animated, { useAnimatedStyle } from 'react-native-reanimated'
import { StyleSheet } from 'react-native'
import React from 'react'

import type { MenuProps, ChildrenProps } from '../../types'
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
  const { slideX, slideY, scale, backgroundColor, opacity } =
    useMenuAnimationValues(isMenuStashed, isLabelHidden, stashPosition)
  const scaledLabelProtrusion = useScaledMenuLabelProtrusion()

  const [dynamicSizes] = useGlobal('dynamicSizes')
  const { 9: borderRadius } = dynamicSizes
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

  const animatedStyle1 = useAnimatedStyle(() => {
    return {
      // WARNING: the order these transforms are listed is
      // important. I think the size of the translations
      // will be reduced proportionally to the scaling if
      // the scaling is performed first. This is platform
      // independent.
      transform: [
        { translateY: slideY.value },
        { translateX: slideX.value },
        { scale: scale.value },
      ],
    }
  })

  const animatedStyle2 = useAnimatedStyle(() => {
    return {
      backgroundColor: backgroundColor.value,
      opacity: opacity.value,
    }
  })

  return (
    <Animated.View style={[styles.animated, animatedStyle1]}>
      <Animated.View style={[styles.overlay, animatedStyle2]}>
        {children}
      </Animated.View>
    </Animated.View>
  )
}
