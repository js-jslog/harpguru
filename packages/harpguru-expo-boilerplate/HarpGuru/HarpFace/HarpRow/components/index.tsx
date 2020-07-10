import { View } from 'react-native'
import React from 'react'

import type { HarpRowProps } from '../types'
import { getStyles } from '../styles'
import { getHarpCells } from '../../HarpCells'

export const HarpRow = (props: HarpRowProps): React.ReactElement => {
  const styles = getStyles(props)

  return <View style={styles.row}>{getHarpCells(props)}</View>
}
