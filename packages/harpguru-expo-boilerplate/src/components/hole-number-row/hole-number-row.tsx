import { View } from 'react-native'
import React from 'react'
import type { ReactElement } from 'react'

import type { XRange } from '../../types'

import { getHoleNumbers } from './utils'
import { getStyles } from './hole-number-row-styles'

export type HoleNumberRowProps = {
  readonly xRange: XRange
}

const styles = getStyles()

export const HoleNumberRow = ({ xRange }: HoleNumberRowProps): ReactElement => {
  const holeNumbers = getHoleNumbers(xRange)

  return <View style={styles.row}>{holeNumbers}</View>
}
