import Animated from 'react-native-reanimated'
import { TapGestureHandler } from 'react-native-gesture-handler'
import { View } from 'react-native'
import React from 'react'
import { AntDesign } from '@expo/vector-icons'

import { TapAnimationTypes } from '../../types'
import type { MenuProps } from '../../types'
import { useSizes, colors } from '../../styles'
import { useScaleAndCallbackOnTap } from '../../hooks'

export const MenuAccessClose = ({
  openCloseMenu,
}: Pick<MenuProps, 'openCloseMenu'>): React.ReactElement => {
  const { dynamicSizes } = useSizes()

  const [tapAnimationValue, handleTapStateChange] = useScaleAndCallbackOnTap(
    openCloseMenu,
    [1, 2],
    [1, 2],
    TapAnimationTypes.Unsafe
  )

  return (
    <TapGestureHandler onHandlerStateChange={handleTapStateChange}>
      <View
        style={{
          position: 'absolute',
          top: 0,
          right: 0,
          padding: dynamicSizes['6'],
          height: dynamicSizes['10'],
        }}
      >
        <Animated.View
          style={[
            {
              transform: [{ scale: tapAnimationValue }],
            },
          ]}
        >
          <AntDesign
            name="close"
            size={dynamicSizes['9']}
            color={colors.inertOutline}
          />
        </Animated.View>
      </View>
    </TapGestureHandler>
  )
}
