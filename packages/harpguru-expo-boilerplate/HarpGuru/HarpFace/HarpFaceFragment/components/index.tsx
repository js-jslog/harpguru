import { View } from 'react-native'
import React from 'react'

import type { HarpFaceFragmentProps } from '../types'
import { getStyles } from '../styles'
import { HoleNumberRow } from '../../HoleNumberRow'
import { getHarpRows } from '../../HarpRows'

export const HarpFaceFragment = (
  props: HarpFaceFragmentProps
): React.ReactElement => {
  const harpRows = getHarpRows(props)
  const styles = getStyles(props)
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
