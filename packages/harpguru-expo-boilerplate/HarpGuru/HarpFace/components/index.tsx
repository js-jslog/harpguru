import {StyleSheet, Text, View} from 'react-native'
import React from 'react'

import type {HarpFaceProps} from '../types'
import {HarpRow} from '../../HarpRow'

const styles = StyleSheet.create({
  body: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
})

export const HarpFace = (props: HarpFaceProps): React.ReactElement => {
  return (
    <>
      <HarpRow {...props} yCoord={2} />
      <View style={styles.body}>
        <Text>Try editing me! 🎉</Text>
      </View>
    </>
  )
}
