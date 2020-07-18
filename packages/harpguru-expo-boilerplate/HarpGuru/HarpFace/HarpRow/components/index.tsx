import { useGlobal } from 'reactn'
import { View } from 'react-native'
import React from 'react'

import type { HarpRowProps } from '../types'
import { getStyles } from '../styles'
import { getHarpCells } from '../../HarpCells'

export const HarpRow = (props: HarpRowProps): React.ReactElement => {
  const [activeHarpStrata] = useGlobal('activeHarpStrata')
  const styles = getStyles({ ...props, activeHarpStrata })

  return <View style={styles.row}>{getHarpCells(props)}</View>
}
