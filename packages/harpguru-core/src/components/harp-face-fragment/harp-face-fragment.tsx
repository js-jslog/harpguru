import { View } from 'react-native'
import React from 'react'

import { HoleNumberRow } from '../hole-number-row'
import type { XRange } from '../../types'

import { useStyles, useHarpRows } from './hooks'

type HarpFaceFragmentProps = {
  readonly xRange: XRange
}

export const HarpFaceFragment = ({
  xRange,
}: HarpFaceFragmentProps): React.ReactElement => {
  const harpRows = useHarpRows(xRange)
  const styles = useStyles(xRange)

  return (
    <View style={styles.fragment}>
      {harpRows.top}
      <HoleNumberRow xRange={xRange} />
      {harpRows.bottom}
    </View>
  )
}
