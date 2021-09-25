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
  // TOOMANYRENDERS: the activeHarpStrata is only required
  // in order to determine whether we are currently on
  // a blow or draw row in the associated styling hook.
  // If there were a global state for the row number of
  // blow and draw then we could avoid rerendering the rows
  // when everything else about the harpstrata and active
  // pitches / degrees change.
  const [activeHarpStrata] = useGlobal('activeHarpStrata')
  const styles = useStyles(yCoord, activeHarpStrata)

  return <View style={styles.row}>{getHarpCells(yCoord, xRange)}</View>
}
