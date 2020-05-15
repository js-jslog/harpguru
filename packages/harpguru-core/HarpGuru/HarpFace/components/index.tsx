import {StyleSheet, Text, View} from 'react-native'
import React from 'react'

import {HarpRow} from '../../HarpRow'

const styles = StyleSheet.create({
  body: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
})

export const HarpFace = (): React.ReactElement => {
  return (
    <>
      <HarpRow />
      <View style={styles.body}>
        <Text>Try editing me! 🎉</Text>
      </View>
    </>
  )
}
