import { Text } from 'react-native'
import React from 'react'

import { usePrevious } from '../../use-previous'

type TestingComponentProps = {
  readonly value: unknown
  readonly initial: unknown
}

export const TestingComponent = ({
  value,
  initial,
}: TestingComponentProps): React.ReactElement => {
  const previousValue = usePrevious(value, initial)
  return (
    <>
      <Text>Current: {value}</Text>
      <Text>Previous: {previousValue}</Text>
    </>
  )
}
