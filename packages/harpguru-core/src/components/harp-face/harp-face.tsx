import { useGlobal } from 'reactn'
import { View } from 'react-native'
import React from 'react'

import { HarpFaceFragment } from '../harp-face-fragment'

import { useStyles, useOctaveColumnGroups } from './hooks'

export const HarpFace = (): React.ReactElement => {
  const [activeDisplayMode] = useGlobal('activeDisplayMode')
  const styles = useStyles()
  const columnRanges = useOctaveColumnGroups()
  const fragments = columnRanges.map((xRange, index) => {
    const harpFaceFragmentProps = {
      activeDisplayMode,
      xRange,
    }
    return <HarpFaceFragment key={index} {...harpFaceFragmentProps} />
  })

  return <View style={styles.face}>{fragments}</View>
}

export const HarpFaceMemo = (): React.ReactElement => {
  return React.useMemo(() => <HarpFace />, [])
}
