import { StyleSheet, View } from 'react-native'
import React from 'react'

import { themeColors } from '../../Theme'
import { HarpFace } from '../../HarpFace'

const { pageColor } = themeColors

const styles = StyleSheet.create({
  guruhome: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: pageColor,
    justifyContent: 'space-between',
    alignItems: 'stretch',
  },
})

export const HomeScreen = (): React.ReactElement => {
  return (
    <View style={styles.guruhome}>
      <HarpFace />
    </View>
  )
}
