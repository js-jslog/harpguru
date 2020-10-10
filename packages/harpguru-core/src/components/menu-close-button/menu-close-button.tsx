import { TapGestureHandler } from 'react-native-gesture-handler'
import { StyleSheet, View } from 'react-native'
import React from 'react'
import { AntDesign } from '@expo/vector-icons'

import type { MenuProps } from '../../types'
import { getSizes, colors } from '../../styles'

export const MenuCloseButton = ({
  openCloseTapHandler,
}: Pick<MenuProps, 'openCloseTapHandler'>): React.ReactElement => {
  const sizes = getSizes()

  return (
    <View
      style={{
        ...StyleSheet.absoluteFillObject,
        justifyContent: 'flex-end',
        flexDirection: 'row',
      }}
    >
      <TapGestureHandler onHandlerStateChange={openCloseTapHandler}>
        <View
          style={{
            padding: sizes['6'],
            height: sizes['10'],
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
