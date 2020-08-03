import Animated from 'react-native-reanimated'
import { StyleSheet, Dimensions } from 'react-native'
import React from 'react'

const styles = StyleSheet.create({
  animatedMenuContainer: {
    ...StyleSheet.absoluteFillObject,
    opacity: 0.5,
  },
})

type AnimatedMenuContainerProps = {
  readonly onScreen: boolean
  readonly children: React.ReactNode
}

export const AnimatedMenuContainer = (
  props: AnimatedMenuContainerProps
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
