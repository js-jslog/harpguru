import {StyleSheet, Text, View} from 'react-native'
import React from 'react'

import { analysePosition } from './analysePosition'
import type { PositionFacts } from './analysePosition'

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

export const HarpCell = (props: HarpCellProps): React.ReactElement => {
  const positionFacts: PositionFacts = analysePosition(props)
  const { thisDegree } = positionFacts
  const { id: degreeId } = thisDegree || { id: undefined }

  return (
    <View style={styles.cell}>
      <Text>{degreeId}</Text>
    </View>
  )
}

export type { YXCoord } from './types'
