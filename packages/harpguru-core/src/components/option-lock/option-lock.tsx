import {
  TapGestureHandler,
  TapGestureHandlerStateChangeEvent,
  State,
} from 'react-native-gesture-handler'
import { StyleSheet, View } from 'react-native'
import React from 'react'
import { FontAwesome5 } from '@expo/vector-icons'

import type { ChildrenProps } from '../../types'
import { getSizes, colors } from '../../styles'

type OptionLockProps = {
  readonly locked: boolean
  readonly handleTap: () => void
}

export const OptionLock = ({
  locked,
  handleTap,
  children,
}: OptionLockProps & ChildrenProps): React.ReactElement => {
  const { 9: padding, 7: iconSize } = getSizes()

  const styles = StyleSheet.create({
    fillColumn: {
      flex: 1,
    },
    overlay: {
      ...StyleSheet.absoluteFillObject,
      flexDirection: 'column',
    },
    content: {
      alignItems: 'center',
      justifyContent: 'flex-start',
      padding: padding,
    },
  })

  const handleTapStateChange = ({
    nativeEvent,
  }: TapGestureHandlerStateChangeEvent) => {
    if (nativeEvent.state !== State.END) return

    handleTap()
  }

  const lockFragment = locked ? (
    <FontAwesome5 name="lock" size={iconSize} color="#aa3333" />
  ) : (
    <FontAwesome5
      name="lock-open"
      size={iconSize}
      color={colors.inertOutline}
    />
  )

  return (
    <View style={styles.fillColumn}>
      {children}
      <View style={styles.overlay}>
        <TapGestureHandler onHandlerStateChange={handleTapStateChange}>
          <View style={styles.content}>{lockFragment}</View>
        </TapGestureHandler>
      </View>
    </View>
  )
}
