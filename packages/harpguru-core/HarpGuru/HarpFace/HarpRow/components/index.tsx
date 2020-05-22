import {StyleSheet, View} from 'react-native'
import React from 'react'

import type {HarpRowProps} from '../types'
import { getHarpCells } from '../../HarpCells'

const stylesOdd = StyleSheet.create({
  row: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: 'powderblue',
  },
})

const stylesEven = StyleSheet.create({
  row: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: 'steelblue',
  },
})

export const HarpRow = (props: HarpRowProps): React.ReactElement => {
  const { yCoord } = props
  let styles
  if (yCoord % 2 === 1) {
    styles = stylesOdd
  } else {
    styles = stylesEven
  }

  return (
    <View style={styles.row}>
      { getHarpCells(props) } 
    </View>
  )
}
