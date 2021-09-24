import { View } from 'react-native'
import React from 'react'

import { HarpFaceFragment } from '../harp-face-fragment'
import { useOctaveColumnGroups } from '../../hooks'

import { useStyles } from './hooks'

export const HarpFace = (): React.ReactElement => {
  const styles = useStyles()
  const columnRanges = useOctaveColumnGroups()
  const fragments = columnRanges.map((xRange, index) => (
    <HarpFaceFragment key={index} xRange={xRange} />
  ))

  return <View style={styles.face}>{fragments}</View>
}

export const HarpFaceMemo = (): React.ReactElement => {
  return React.useMemo(() => <HarpFace />, [])
}
