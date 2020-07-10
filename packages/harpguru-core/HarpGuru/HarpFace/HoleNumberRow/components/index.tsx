import { View } from 'react-native'
import React from 'react'
import type { ReactElement } from 'react'

import { getStyles } from '../styles'
import { getHoleNumbers } from '../getHoleNumbers'
import type { HarpFaceProps } from '../../types'

const styles = getStyles()

export const HoleNumberRow = (props: HarpFaceProps): ReactElement => {
  const holeNumbers = getHoleNumbers(props)

  return <View style={styles.row}>{holeNumbers}</View>
}
