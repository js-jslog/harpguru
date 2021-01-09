import { Text, View } from 'react-native'
import React from 'react'
import type { ReactElement } from 'react'

import type { Coord } from '../../types'

export enum HoleNumberIds {
  One = '1',
  Two = '2',
  Three = '3',
  Four = '4',
  Five = '5',
  Six = '6',
  Seven = '7',
  Eight = '8',
  Nine = '9',
  Ten = '10',
  Eleven = '11',
  Twelve = '12',
  Thirteen = '13',
  Fourteen = '14',
  Fifteen = '15',
  Sixteen = '16',
}

type HoleNumberProps = {
  readonly xCoord: Coord
}

import { useStyles } from './hooks'

export function HoleNumber({ xCoord }: HoleNumberProps): ReactElement {
  const styles = useStyles()
  const holeNumber: HoleNumberIds = `${xCoord + 1}` as HoleNumberIds

  return (
    <View style={styles.cell}>
      <Text style={styles.text}>{holeNumber}</Text>
    </View>
  )
}
