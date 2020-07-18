import { useGlobal } from 'reactn'
import { View } from 'react-native'
import React from 'react'

import type { HarpFaceProps } from '../types'
import { getStyles } from '../styles'
import { getHarpFaceFacts } from '../helpers'
import { HarpFaceFragment } from '../HarpFaceFragment'

export const HarpFace = (props: HarpFaceProps): React.ReactElement => {
  const [activeHarpStrata] = useGlobal('activeHarpStrata')
  const styles = getStyles({ ...props, activeHarpStrata })
  const { octaveColumnGroups } = getHarpFaceFacts({
    ...props,
    activeHarpStrata,
  })
  const fragments = octaveColumnGroups.map((xRange, index) => {
    const harpFaceFragmentProps = {
      ...props,
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
