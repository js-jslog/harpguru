import {
  TapGestureHandler,
  TapGestureHandlerStateChangeEvent,
  State,
} from 'react-native-gesture-handler'
import { StyleSheet, View, Text } from 'react-native'
import React from 'react'

import { getSizes } from '../../styles'

type OptionLockProps = {
  readonly children: React.ReactNode
  readonly locked: boolean
  readonly handleTap: () => void
}

export const OptionLock = ({
  children,
  locked,
  handleTap,
}: OptionLockProps): React.ReactElement => {
  const { 10: contentHeight } = getSizes()

  const styles = StyleSheet.create({
    fillColumn: {
      flex: 1,
    },
    overlay: {
      ...StyleSheet.absoluteFillObject,
      flexDirection: 'row',
      alignItems: 'center',
    },
    content: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      height: contentHeight,
    },
  })

  const labelText = locked ? 'locked' : 'tap to lock'

  const handleTapStateChange = ({
    nativeEvent,
  }: TapGestureHandlerStateChangeEvent) => {
    if (nativeEvent.state !== State.END) return

    handleTap()
  }

  return (
    <TapGestureHandler onHandlerStateChange={handleTapStateChange}>
      <View style={styles.fillColumn}>
        <View style={styles.overlay}>
          <View style={styles.content}>
            <Text>{labelText}</Text>
          </View>
        </View>
        {children}
      </View>
    </TapGestureHandler>
  )
}
