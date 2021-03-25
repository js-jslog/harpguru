import { View } from 'react-native'
import React from 'react'
import type { ReactElement } from 'react'

import { TextWithoutOSScale } from '../text-without-os-scale'
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

import { getStyles } from './hole-number-styles'

const styles = getStyles()

export const HoleNumber = ({ xCoord }: HoleNumberProps): ReactElement => {
  const holeNumber: HoleNumberIds = `${xCoord + 1}` as HoleNumberIds

  return (
    <View style={styles.cell}>
      <TextWithoutOSScale style={styles.text}>{holeNumber}</TextWithoutOSScale>
    </View>
  )
}
