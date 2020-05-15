import {StyleSheet, View} from 'react-native'
import React from 'react'

import type {HarpFaceProps} from '../../HarpFace'
import {HarpCell} from '../../HarpCell'

const styles = StyleSheet.create({
  row: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: 'powderblue',
  },
})

export const HarpRow = (props: HarpFaceProps): React.ReactElement => {
  return (
    <View style={styles.row}>
      <HarpCell {...props} yxCoord={[3,0]} />
      <HarpCell {...props} yxCoord={[3,1]} />
      <HarpCell {...props} yxCoord={[3,2]} />
    </View>
  )
}
