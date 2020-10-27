import Animated from 'react-native-reanimated'
import { StyleSheet } from 'react-native'
import React from 'react'

import { getMenuStylesAndAnimationVals } from '../../utils'
import { MenuProps } from '../../types'
import { getSizes } from '../../styles'

type LocalMenuProps = MenuProps & {
  readonly children: React.ReactNode
}
export const Menu = ({
  hideMenu,
  hideLabel,
  stashPosition,
  children,
}: LocalMenuProps): React.ReactElement => {
  const {
    menuSlideXTranslation,
    menuSlideYTranslation,
    menuScale,
    menuBackgroundColor,
    menuOpacity,
    labelProtrusion,
  } = getMenuStylesAndAnimationVals(hideMenu, hideLabel, stashPosition)

  const { 9: borderRadius } = getSizes()
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
  })

  return (
    <Animated.View
      style={[
        styles.animated,
        {
          transform: [
            { translateX: menuSlideXTranslation },
            { translateY: menuSlideYTranslation },
            { scale: menuScale },
          ],
        },
      ]}
    >
      <Animated.View
        style={[
          styles.overlay,
          {
            backgroundColor: menuBackgroundColor,
            opacity: menuOpacity,
          },
        ]}
      >
        {children}
      </Animated.View>
    </Animated.View>
  )
}