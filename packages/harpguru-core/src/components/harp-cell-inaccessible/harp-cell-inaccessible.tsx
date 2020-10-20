import { View, ViewStyle } from 'react-native'
import React from 'react'

type StyleProps = {
  readonly baseStyles: ViewStyle
}

export const HarpCellInaccessible = ({
  baseStyles,
}: StyleProps): React.ReactElement => {
  return <View accessible={false} style={baseStyles} />
}

export const MemoHarpCellInaccessible = React.memo(HarpCellInaccessible)
