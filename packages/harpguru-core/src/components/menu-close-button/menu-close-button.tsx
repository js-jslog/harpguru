import Animated from 'react-native-reanimated'
import { TapGestureHandler } from 'react-native-gesture-handler'
import { StyleSheet, View } from 'react-native'
import React from 'react'
import { AntDesign } from '@expo/vector-icons'

import { TapAnimationTypes } from '../../types'
import type { MenuProps } from '../../types'
import { colors } from '../../styles'
import { useSizes, useScaleAndCallbackOnTap } from '../../hooks'

export const MenuCloseButton = ({
  openCloseMenu,
}: Pick<MenuProps, 'openCloseMenu'>): React.ReactElement => {
  const sizes = useSizes()

  const [tapAnimationValue, handleTapStateChange] = useScaleAndCallbackOnTap(
    openCloseMenu,
    [1, 2],
    [1, 2],
    TapAnimationTypes.Unsafe
  )

  return (
    <View
      style={{
        ...StyleSheet.absoluteFillObject,
        justifyContent: 'flex-end',
        flexDirection: 'row',
      }}
    >
      <TapGestureHandler onHandlerStateChange={handleTapStateChange}>
        <View
          style={{
            padding: sizes['6'],
            height: sizes['10'],
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
              size={sizes['9']}
              color={colors.inertOutline}
            />
          </Animated.View>
        </View>
      </TapGestureHandler>
    </View>
  )
}
