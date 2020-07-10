import Animated from 'react-native-reanimated'
import { Dimensions } from 'react-native'
import React from 'react'

import type { MenuContainerProps } from '../types'
import { styles } from '../../styles'

export const AnimatedMenuContainer = (
  props: MenuContainerProps
): React.ReactElement => {
  const { children, onScreen } = props

  const { width: windowWidth, height: windowHeight } = Dimensions.get('window')
  const guaranteeOffScreenWidth =
    windowWidth > windowHeight ? windowWidth : windowHeight

  return (
    <Animated.View
      style={[
        styles.animatedMenuContainer,
        {
          transform: [
            { translateX: onScreen ? 0 : guaranteeOffScreenWidth * -1 },
          ],
        },
      ]}
    >
      {children}
    </Animated.View>
  )
}
