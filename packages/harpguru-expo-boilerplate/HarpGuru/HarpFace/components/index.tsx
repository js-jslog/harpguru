import { useGlobal } from 'reactn'
import { View } from 'react-native'
import React from 'react'

import { getStyles } from '../styles'
import { getHarpFaceFacts } from '../helpers'
import { HarpFaceFragment } from '../HarpFaceFragment'

export const HarpFace = (): React.ReactElement => {
  const [activeHarpStrata] = useGlobal('activeHarpStrata')
  const [activeDisplayMode] = useGlobal('activeDisplayMode')
  const styles = getStyles({ activeHarpStrata })
  const { octaveColumnGroups } = getHarpFaceFacts({
    activeHarpStrata,
  })
  const fragments = octaveColumnGroups.map((xRange, index) => {
    const harpFaceFragmentProps = {
      activeDisplayMode,
      xRange,
    }
    return <HarpFaceFragment key={index} {...harpFaceFragmentProps} />
  })

  return (
    <View style={styles.facewrapper}>
      <View style={styles.face}>{fragments}</View>
    </View>
  )
}
