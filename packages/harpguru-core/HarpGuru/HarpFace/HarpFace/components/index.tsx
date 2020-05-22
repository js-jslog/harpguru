import {StyleSheet, View} from 'react-native'
import React from 'react'

import type {HarpFaceProps} from '../types'
import { HoleNumberRow } from '../../HoleNumberRow'
import { getHarpRows } from '../../HarpRows'

const styles = StyleSheet.create({
  face: {
    flex: 5,
    flexDirection: 'column',
    backgroundColor: 'black',
    justifyContent: 'space-between',
    alignItems: 'stretch',
  },
})

export const HarpFace = (props: HarpFaceProps): React.ReactElement => {
  const harpRows = getHarpRows(props)
  return (
    <View style={styles.face}>
      { harpRows.top }
      <HoleNumberRow {...props} />
      { harpRows.bottom }
    </View>
  )
}
