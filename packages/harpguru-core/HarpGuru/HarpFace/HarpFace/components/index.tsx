import { View } from 'react-native'
import React from 'react'

import { getStyles } from '../styles'
import type { HarpFaceProps } from '../../types'
import { HoleNumberRow } from '../../HoleNumberRow'
import { getHarpRows } from '../../HarpRows'

export const HarpFace = (props: HarpFaceProps): React.ReactElement => {
  const harpRows = getHarpRows(props)
  const styles = getStyles(props)

  return (
    <View style={styles.facewrapper}>
      <View style={styles.face}>
        {harpRows.top}
        <HoleNumberRow {...props} />
        {harpRows.bottom}
      </View>
    </View>
  )
}
