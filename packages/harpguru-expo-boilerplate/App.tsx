/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import { Colors } from 'react-native/Libraries/NewAppScreen'
import { StatusBar, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import type { ReactElement } from 'react'
import { HarpGuru } from 'harpguru-core'

declare const global: { HermesInternal: null | unknown }

const styles = StyleSheet.create({
  engine: {
    position: 'absolute',
    right: 0,
  },
  footer: {
    color: Colors.dark,
    fontSize: 12,
    fontWeight: '600',
    padding: 4,
    paddingRight: 12,
    textAlign: 'right',
  },
})

const App = (): ReactElement => {
  return (
    <>
      <StatusBar hidden={true} />
      {global.HermesInternal == null ? null : (
        <View style={styles.engine}>
          <Text style={styles.footer}>Engine: Hermes</Text>
        </View>
      )}
      <HarpGuru />
    </>
  )
}

export default App
