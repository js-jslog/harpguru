import { useGlobal } from 'reactn'
import { View } from 'react-native'
import React from 'react'

import { HoleNumberRow } from '../hole-number-row'
import type { XRange } from '../../types'

import { getHarpRows } from './utils'
import { getStyles } from './harp-face-fragment-styles'

type HarpFaceFragmentProps = {
  readonly xRange: XRange
}

export const HarpFaceFragment = ({
  xRange,
}: HarpFaceFragmentProps): React.ReactElement => {
  const [activeHarpStrata] = useGlobal('activeHarpStrata')
  const harpRows = getHarpRows(xRange, activeHarpStrata)
  const styles = getStyles(xRange, activeHarpStrata)

  return (
    <View style={styles.fragment}>
      {harpRows.top}
      <HoleNumberRow xRange={xRange} />
      {harpRows.bottom}
    </View>
  )
}
