import { Text, TextProps } from 'react-native'
import React from 'react'

import type { ChildrenProps } from '../../types'

const defaultProps: TextProps = {
  allowFontScaling: false,
}

export const TextWithoutOSScale = ({
  children,
  ...props
}: ChildrenProps & TextProps): React.ReactElement => {
  return (
    <Text {...defaultProps} {...props}>
      {children}
    </Text>
  )
}
