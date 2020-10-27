import Animated, { add } from 'react-native-reanimated'
import type { Node } from 'react-native-reanimated'
import { TapGestureHandler } from 'react-native-gesture-handler'
import { View, StyleSheet } from 'react-native'
import React from 'react'

import { useTapAnimation } from './hooks'

type ChildProps = {
  readonly children: React.ReactNode
  readonly counterScale: Node<number>
  readonly openCloseMenu: () => void
  readonly labelProtrusion: number
}

export const MenuOpenButton = ({
  children,
  counterScale,
  openCloseMenu,
  labelProtrusion,
}: ChildProps): React.ReactElement => {
  const styles = StyleSheet.create({
    label: {
      alignItems: 'center',
      justifyContent: 'center',
      width: labelProtrusion,
    },
  })

  const [tapAnimationValue, handleTapStateChange] = useTapAnimation(
    openCloseMenu
  )
  const totalScaleValue = add(tapAnimationValue, counterScale)

  return (
    <TapGestureHandler onHandlerStateChange={handleTapStateChange}>
      <View style={styles.label}>
        <Animated.View
          style={[
            {
              transform: [{ scale: totalScaleValue }],
            },
          ]}
        >
          {children}
        </Animated.View>
      </View>
    </TapGestureHandler>
  )
}
