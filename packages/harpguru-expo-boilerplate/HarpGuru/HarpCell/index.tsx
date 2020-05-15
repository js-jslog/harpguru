import {StyleSheet, Text, View} from 'react-native'
import React from 'react'

import {HarpCellProps} from './types'

const styles = StyleSheet.create({
  cell: {
    backgroundColor: 'skyblue',
    justifyContent: 'center',
    alignItems: 'center',
    width: 50,
    height: 50,
  },
})

export const HarpCell = (props: HarpCellProps) => {
  return (
    <View style={styles.cell}>
      <Text>{props.content}</Text>
    </View>
  )
}
