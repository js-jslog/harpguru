import { useGlobal } from 'reactn'
import React from 'react'
import { render } from '@testing-library/react-native'

export const setup = (): Record<'0', Record<string, unknown>> => {
  const returnVal = { '0': {} }
  const TestComponent = (): null => {
    Object.assign(returnVal, useGlobal())
    return null
  }
  render(<TestComponent />)
  return returnVal
}
