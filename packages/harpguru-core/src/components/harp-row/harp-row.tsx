import { useGlobal } from 'reactn'
import { View } from 'react-native'
import React from 'react'

import type { Coord, XRange } from '../../types'

import { getHarpCells } from './utils'
import { useStyles } from './hooks'

type HarpRowProps = {
  readonly yCoord: Coord
  readonly xRange: XRange
}

export const HarpRow = ({
  yCoord,
  xRange,
}: HarpRowProps): React.ReactElement => {
  const [activeHarpStrata] = useGlobal('activeHarpStrata')
  const styles = useStyles(yCoord, activeHarpStrata)

  return <View style={styles.row}>{getHarpCells(yCoord, xRange)}</View>
}
