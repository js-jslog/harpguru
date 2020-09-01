import { StyleSheet, View, Text } from 'react-native'
import React from 'react'

type OptionLockProps = {
  readonly children: React.ReactNode
  readonly locked: boolean
}

export const OptionLock = ({
  children,
  locked,
}: OptionLockProps): React.ReactElement => {
  const labelText = locked ? 'locked' : 'tap to lock'
  return (
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
  )
}
