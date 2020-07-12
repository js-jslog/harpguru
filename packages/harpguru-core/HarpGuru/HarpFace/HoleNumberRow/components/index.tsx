import { View } from 'react-native'
import React from 'react'
import type { ReactElement } from 'react'

import { HoleNumberRowProps } from '../types'
import { getStyles } from '../styles'
import { getHoleNumbers } from '../getHoleNumbers'

const styles = getStyles()

export const HoleNumberRow = (props: HoleNumberRowProps): ReactElement => {
  const holeNumbers = getHoleNumbers(props)

  return <View style={styles.row}>{holeNumbers}</View>
}
