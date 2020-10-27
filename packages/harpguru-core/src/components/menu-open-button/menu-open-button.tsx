import Animated from 'react-native-reanimated'
import type { Node } from 'react-native-reanimated'
import React from 'react'

type ChildProps = {
  readonly children: React.ReactNode
  readonly scaleValue: Node<number>
}

export const MenuOpenButton = ({
  children,
  scaleValue,
}: ChildProps): React.ReactElement => {
  return (
    <Animated.View
      style={[
        {
          transform: [{ scale: scaleValue }],
        },
      ]}
    >
      {children}
    </Animated.View>
  )
}
