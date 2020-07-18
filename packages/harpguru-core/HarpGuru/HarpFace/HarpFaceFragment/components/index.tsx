import { useGlobal } from 'reactn'
import { View } from 'react-native'
import React from 'react'

import type { HarpFaceFragmentProps } from '../types'
import { getStyles } from '../styles'
import { HoleNumberRow } from '../../HoleNumberRow'
import { getHarpRows } from '../../HarpRows'

export const HarpFaceFragment = (
  props: HarpFaceFragmentProps
): React.ReactElement => {
  const [activeHarpStrata, setActiveHarpStrata] = useGlobal('activeHarpStrata')
  const harpRows = getHarpRows({ ...props, activeHarpStrata })
  const styles = getStyles({ ...props, activeHarpStrata, setActiveHarpStrata })
  const holeNumberRowProps = {
    xRange: props.xRange,
  }

  return (
    <View style={styles.fragment}>
      {harpRows.top}
      <HoleNumberRow {...holeNumberRowProps} />
      {harpRows.bottom}
    </View>
  )
}
