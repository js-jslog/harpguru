import {Text, View} from 'react-native'
import React from 'react'
import type { ReactElement } from 'react'

import type { HoleNumberIds, HoleNumberProps } from '../types'
import { getStyles } from '../styles'

const styles = getStyles()

export function HoleNumber(props: HoleNumberProps): ReactElement {
  const { xCoord } = props
  const holeNumber: HoleNumberIds = `${xCoord + 1}` as HoleNumberIds

  return (
    <View style={styles.cell}>
      <Text style={styles.text}>{holeNumber}</Text>
    </View>
  )
}
