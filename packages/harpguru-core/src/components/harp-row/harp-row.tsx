import { useGlobal } from 'reactn'
import { View } from 'react-native'
import React from 'react'

import type { Coord, XRange } from '../../types'

import { getHarpCells } from './utils'
import { useStyles } from './hooks'

type HarpRowProps = {
  readonly yCoord: Coord
  readonly xRange: XRange
  readonly harpfaceIndex: 0 | 1
}

export const HarpRow = ({
  yCoord,
  xRange,
  harpfaceIndex,
}: HarpRowProps): React.ReactElement => {
  const [activeInteractionMatrix] = useGlobal('activeInteractionMatrix')
  const styles = useStyles(yCoord, activeInteractionMatrix[harpfaceIndex])

  return <View style={styles.row}>{getHarpCells(yCoord, xRange)}</View>
}
