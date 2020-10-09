import { StyleSheet, View, Text } from 'react-native'
import React from 'react'

import { getSizes, colors } from '../../styles'

export const MenuInstructionLabel = (): React.ReactElement => {

  const sizes = getSizes()

  return (
    <View style={{
      ...StyleSheet.absoluteFillObject,
      justifyContent: 'flex-end',
      alignItems: 'center',
      flexDirection: 'column'
    }}>
      <View style={{
        padding: sizes['7'],
      }}>
        <Text style={{
          fontSize: sizes['7'],
          color: colors.inertOutline
        }}>
          Swipe options up or down to select
        </Text>
      </View>
    </View>
  )
}
