import { View } from 'react-native'
import React from 'react'

import { HoleNumberRow } from '../hole-number-row'
import type { XRange } from '../../types'

import { useStyles, useHarpRows } from './hooks'

type HarpFaceFragmentProps = {
  readonly xRange: XRange
  readonly harpfaceIndex: 0 | 1
}

export const HarpFaceFragment = ({
  xRange,
  harpfaceIndex,
}: HarpFaceFragmentProps): React.ReactElement => {
  const harpRows = useHarpRows(xRange, harpfaceIndex)
  const styles = useStyles(xRange, harpfaceIndex)

  return (
    <View style={styles.fragment}>
      {harpRows.top}
      <HoleNumberRow xRange={xRange} />
      {harpRows.bottom}
    </View>
  )
}
