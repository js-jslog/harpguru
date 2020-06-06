import {StyleSheet, View} from 'react-native'
import React from 'react'

import type {HarpRowProps} from '../types'
import { isBlowOrDrawRow, isBlowRow, isDrawRow } from '../isBlowOrDrawRow'
import { getHarpCells } from '../../HarpCells'
import { themeSizes, themeColors } from '../../../Styles'

const { 1: borderWidth, 6: borderRadius } = themeSizes
const { homeRowsColor, inertOutline } = themeColors


export const HarpRow = (props: HarpRowProps): React.ReactElement => {
  const styles = StyleSheet.create({
    row: {
      flex: 1,
      flexDirection: 'row',
      justifyContent: 'space-around',
      alignItems: 'center',
      borderColor: inertOutline,
      borderTopWidth: isBlowRow(props) ? borderWidth : 0,
      borderBottomWidth: isDrawRow(props) ? borderWidth : 0,
      borderRightWidth: isBlowOrDrawRow(props) ? borderWidth : 0,
      borderLeftWidth: isBlowOrDrawRow(props) ? borderWidth : 0,
      backgroundColor: isBlowOrDrawRow(props) ? homeRowsColor : 'transparent',
      borderTopLeftRadius: isBlowRow(props) ? borderRadius : 0,
      borderTopRightRadius: isBlowRow(props) ? borderRadius : 0,
      borderBottomLeftRadius: isDrawRow(props) ? borderRadius : 0,
      borderBottomRightRadius: isDrawRow(props) ? borderRadius : 0,
    },
  })

  return (
    <View style={styles.row}>
      { getHarpCells(props) } 
    </View>
  )
}
