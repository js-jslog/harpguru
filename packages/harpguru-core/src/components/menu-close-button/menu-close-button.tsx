import { TapGestureHandler } from 'react-native-gesture-handler'
import type { TapGestureHandlerStateChangeEvent } from 'react-native-gesture-handler'
import { StyleSheet, View } from 'react-native'
import React from 'react'
import { AntDesign } from '@expo/vector-icons'

import type { MenuProps } from '../../types'
import { getSizes, colors } from '../../styles'

export const MenuCloseButton = ({
  tapHandler,
}: Pick<MenuProps, 'tapHandler'>): React.ReactElement => {
  const sizes = getSizes()

  const handleTapStateChange = (event: TapGestureHandlerStateChangeEvent) => {
    tapHandler(event)
  }

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
          }}
        >
          <AntDesign
            name="close"
            size={sizes['9']}
            color={colors.inertOutline}
          />
        </View>
      </TapGestureHandler>
    </View>
  )
}
