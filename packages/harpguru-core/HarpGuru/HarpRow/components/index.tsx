import {StyleSheet, View} from 'react-native'
import React from 'react'

import type {HarpRowProps} from '../types'
import { getHarpCells } from '../../HarpCells'

const styles = StyleSheet.create({
  row: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: 'powderblue',
  },
})

export const HarpRow = (props: HarpRowProps): React.ReactElement => {
  return (
    <View style={styles.row}>
      { getHarpCells(props) } 
    </View>
  )
}
