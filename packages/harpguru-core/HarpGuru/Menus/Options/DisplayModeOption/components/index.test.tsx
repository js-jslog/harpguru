import { useGlobal } from 'reactn'
import React from 'react'
import { render } from '@testing-library/react-native'

import { DisplayModes } from '../../../../types'

import { DisplayModeOption } from './index'

jest.mock('reactn')
const mockUseGlobal = useGlobal as jest.Mock

mockUseGlobal.mockImplementation((stateItem: string) => {
  if (stateItem === 'activeDisplayMode') return [DisplayModes.Degree]
  return undefined
})

test('DisplayModeOption renders a component with display mode information displayed', () => {
  const { getByText } = render(<DisplayModeOption />)

  expect(getByText(DisplayModes.Degree)).toBeTruthy()
})
