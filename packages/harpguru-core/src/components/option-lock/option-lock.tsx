import {
  TapGestureHandler,
  TapGestureHandlerStateChangeEvent,
  State,
} from 'react-native-gesture-handler'
import { StyleSheet, View, Text } from 'react-native'
import React from 'react'

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
  const labelText = locked ? 'locked' : 'tap to lock'

  const handleTapStateChange = ({
    nativeEvent,
  }: TapGestureHandlerStateChangeEvent) => {
    if (nativeEvent.state !== State.END) return

    handleTap()
  }

  return (
    <TapGestureHandler onHandlerStateChange={handleTapStateChange}>
      <View style={{ flex: 1 }}>
        <View
          style={{
            ...StyleSheet.absoluteFillObject,
            flexDirection: 'row',
            alignItems: 'center',
          }}
        >
          <View
            style={{
              flex: 1,
              alignItems: 'center',
              justifyContent: 'center',
              height: 200,
            }}
          >
            <Text>{labelText}</Text>
          </View>
        </View>
        {children}
      </View>
    </TapGestureHandler>
  )
}
