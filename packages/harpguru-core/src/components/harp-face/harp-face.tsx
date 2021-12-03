import { View } from 'react-native'
import React from 'react'

import { HarpFaceFragment } from '../harp-face-fragment'

import { useStyles, useOctaveColumnGroups } from './hooks'

type HarpFaceProps = {
  readonly harpfaceIndex: 'harpface1' | 'harpface2'
}

export const HarpFace = ({
  harpfaceIndex,
}: HarpFaceProps): React.ReactElement => {
  const styles = useStyles(harpfaceIndex)
  const columnRanges = useOctaveColumnGroups()
  const fragments = columnRanges.map((xRange, index) => (
    <HarpFaceFragment
      key={index}
      xRange={xRange}
      harpfaceIndex={harpfaceIndex}
    />
  ))

  return <View style={styles.face}>{fragments}</View>
}
