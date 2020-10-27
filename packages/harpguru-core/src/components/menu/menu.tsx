import Animated from 'react-native-reanimated'
import React from 'react'

import { getMenuStylesAndAnimationVals } from '../../utils'
import { MenuProps } from '../../types'

type LocalMenuProps = MenuProps & {
  readonly children: React.ReactNode
}
export const Menu = ({
  hideMenu,
  hideLabel,
  children,
}: LocalMenuProps): React.ReactElement => {
  const {
    styles,
    menuSlideXTranslation,
    menuSlideYTranslation,
    menuScale,
    menuBackgroundColor,
    menuOpacity,
  } = getMenuStylesAndAnimationVals(hideMenu, hideLabel, 'BOTTOM')

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
