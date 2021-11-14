import { View } from 'react-native'
import React from 'react'

import { HarpFaceFragment } from '../harp-face-fragment'

import { useStyles, useOctaveColumnGroups } from './hooks'

export const HarpFace = (): React.ReactElement => {
  // TODO: This needs to be determined based on which
  // harpface is being rendered when we actually do
  // potentially render 2 harpfaces.
  const harpfaceIndex = 'harpface1'
  const styles = useStyles(harpfaceIndex)
  const columnRanges = useOctaveColumnGroups(harpfaceIndex)
  const fragments = columnRanges.map((xRange, index) => (
    <HarpFaceFragment
      key={index}
      xRange={xRange}
      harpfaceIndex={harpfaceIndex}
    />
  ))

  return <View style={styles.face}>{fragments}</View>
}

export const HarpFaceMemo = (): React.ReactElement => {
  return React.useMemo(() => <HarpFace />, [])
}
