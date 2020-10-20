import { View, ViewStyle } from 'react-native'
import React from 'react'

type StyleProps = {
  readonly style: ViewStyle
}

export const HarpCellInaccessible = ({
  style,
}: StyleProps): React.ReactElement => {
  return (
    <View accessible={false} style={style}>
      <View style={style} />
    </View>
  )
}

export const MemoHarpCellInaccessible = React.memo(HarpCellInaccessible)
