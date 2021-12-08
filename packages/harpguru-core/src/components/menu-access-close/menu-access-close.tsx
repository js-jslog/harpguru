import { useGlobal } from 'reactn'
import Animated from 'react-native-reanimated'
import { TapGestureHandler } from 'react-native-gesture-handler'
import { View } from 'react-native'
import React from 'react'
import { AntDesign } from '@expo/vector-icons'

import { getColors } from '../../utils'
import { TapAnimationTypes } from '../../types'
import type { MenuProps } from '../../types'
import { useScaleAndCallbackOnTap } from '../../hooks'

export const MenuAccessClose = ({
  openCloseMenu,
}: Pick<MenuProps, 'openCloseMenu'>): React.ReactElement => {
  const [staticSizes] = useGlobal('staticSizes')

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
          padding: staticSizes['6'],
          height: staticSizes['10'],
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
            size={staticSizes['9']}
            color={getColors().inertOutline}
          />
        </Animated.View>
      </View>
    </TapGestureHandler>
  )
}
