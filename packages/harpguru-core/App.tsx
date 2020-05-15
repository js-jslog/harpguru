/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import {Colors} from 'react-native/Libraries/NewAppScreen'
import {StatusBar, StyleSheet, Text, View} from 'react-native'
import React from 'react'
import { getApparatusIds, getPozitionIds, getPitchIds, getHarpStrata } from 'harpstrata'
import type { HarpStrata, HarpStrataProps } from 'harpstrata'

import {HarpFace, DisplayModes} from './HarpGuru'
import type { HarpFaceProps } from './HarpGuru'

const [ apparatusId ] = getApparatusIds()
const [ pozitionId ] = getPozitionIds()
const [ pitchId ] = getPitchIds()
const harpStrataProps: HarpStrataProps = {
  apparatusId, pozitionId, keyPitchId: pitchId, activeIds: []
}
const initialHarpStrata: HarpStrata = getHarpStrata(harpStrataProps)
const { Degree: displayMode } = DisplayModes
const harpFaceProps: HarpFaceProps = { harpStrata: initialHarpStrata, displayMode }

declare const global: {HermesInternal: null | {}}

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

const App = (): Element => {
  return (
    <>
      <StatusBar barStyle="dark-content" />
      {global.HermesInternal == null ? null : (
        <View style={styles.engine}>
          <Text style={styles.footer}>Engine: Hermes</Text>
        </View>
      )}
      <HarpFace {...harpFaceProps} />
    </>
  )
}

export default App
