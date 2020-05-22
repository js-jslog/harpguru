import {StyleSheet, View} from 'react-native'
import React from 'react'
import type { ReactElement } from 'react'

import type { HarpFaceProps } from '../HarpFace'

import { getHoleNumbers } from './getHoleNumbers'

const styles = StyleSheet.create({
  row: {
    flex: 0.4,
    backgroundColor: 'red',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
})

export const HoleNumberRow = (props: HarpFaceProps): ReactElement => {
  const holeNumbers = getHoleNumbers(props)

  return (
    <View style={styles.row}>
      {holeNumbers}
    </View>
  )
}
