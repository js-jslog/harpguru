import { Text, TextProps } from 'react-native'
import React from 'react'

import type { ChildrenProps } from '../../types'

export const TextWithoutOSScale = ({
  children,
  ...props
}: ChildrenProps & TextProps): React.ReactElement => {
  return (
    <Text allowFontScaling={false} {...props}>
      {children}
    </Text>
  )
}
