import { Text } from 'react-native'
import React from 'react'

import { styles } from '../../../styles'

type ChildProps = {
  readonly children: React.ReactNode
}

export const Title = ({children}: ChildProps): React.ReactElement => {
  return <Text style={styles.title}>{children}</Text>
}
export const Option = ({children}: ChildProps): React.ReactElement => {
  return <Text style={styles.option}>{children}</Text>
}
