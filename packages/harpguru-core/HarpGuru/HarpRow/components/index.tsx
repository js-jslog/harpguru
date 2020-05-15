import {StyleSheet, View} from 'react-native'
import React from 'react'

import type {HarpRowProps} from '../types'
import type {YXCoord} from '../../HarpFace'
import {HarpCell} from '../../HarpCell'

const styles = StyleSheet.create({
  row: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: 'powderblue',
  },
})

export const HarpRow = (props: HarpRowProps): React.ReactElement => {
  const { yCoord } = props
  const yxCoord1: YXCoord = [yCoord, 0]
  const yxCoord2: YXCoord = [yCoord, 1]
  const yxCoord3: YXCoord = [yCoord, 2]

  return (
    <View style={styles.row}>
      <HarpCell {...props} yxCoord={yxCoord1} />
      <HarpCell {...props} yxCoord={yxCoord2} />
      <HarpCell {...props} yxCoord={yxCoord3} />
    </View>
  )
}
