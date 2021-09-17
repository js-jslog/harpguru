import { useGlobal } from 'reactn'
import { View } from 'react-native'
import React from 'react'

import { HoleNumberRow } from '../hole-number-row'
import type { XRange } from '../../types'

import { getHarpRows } from './utils'
import { useStyles } from './hooks'

type HarpFaceFragmentProps = {
  readonly xRange: XRange
}

export const HarpFaceFragment = ({
  xRange,
}: HarpFaceFragmentProps): React.ReactElement => {
  const [activeHarpStrata] = useGlobal('activeHarpStrata')
  const [columnBounds] = useGlobal('columnBounds')
  const harpRows = getHarpRows(xRange, activeHarpStrata)
  const styles = useStyles(xRange, activeHarpStrata, columnBounds)

  return (
    <View style={styles.fragment}>
      {harpRows.top}
      <HoleNumberRow xRange={xRange} />
      {harpRows.bottom}
    </View>
  )
}
