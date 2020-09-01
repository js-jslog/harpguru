import { StyleSheet, View, Text } from 'react-native'
import React from 'react'

type ChildProps = {
  readonly children: React.ReactNode
}

export const OptionLock = ({
  children}: ChildProps
): React.ReactElement => {
  return (
    <View style={{flex:1}} >
      <View style={{...StyleSheet.absoluteFillObject, flexDirection: 'row', alignItems: 'center'}} >
        <View style={{flex:1, alignItems: 'center', justifyContent: 'center', height: 200}} >
          <Text>locked</Text>
        </View>
      </View>
      {children}
    </View>
  )
}
