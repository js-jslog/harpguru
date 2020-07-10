import React from 'react'
import { render } from '@testing-library/react-native'

import { DisplayModes } from '../../../../HarpFace'

import { DisplayModeOption } from './index'

test('DisplayModeOption renders a component with display mode information displayed', () => {
  const menuOptionProps = {
    activeDisplayMode: DisplayModes.Degree,
    setActiveDisplayMode: jest.fn(),
  }
  const { getByText } = render(<DisplayModeOption {...menuOptionProps} />)

  expect(getByText(DisplayModes.Degree)).toBeTruthy()
})
