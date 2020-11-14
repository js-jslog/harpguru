import { View } from 'react-native'
import type { ViewStyle } from 'react-native'
import React from 'react'

type StyleProps = {
  readonly baseStyles: ViewStyle
}

export const HarpCellInaccessible = ({
  baseStyles,
}: StyleProps): React.ReactElement => {
  return <View accessible={false} style={baseStyles} />
}

const areEqual = (prevProps: StyleProps, nextProps: StyleProps) => {
  // The baseStyle object is too deep to be successfully analysed by the memo comparison.
  // It's only the width and height which will vary in each render and they are
  // correlated so we only need to check one of them.
  const equalStyle = prevProps.baseStyles.width === nextProps.baseStyles.width

  return equalStyle
}

export const MemoHarpCellInaccessible = React.memo(
  HarpCellInaccessible,
  areEqual
)
