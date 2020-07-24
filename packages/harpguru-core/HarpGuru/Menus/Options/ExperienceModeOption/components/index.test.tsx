import { useGlobal } from 'reactn'
import React from 'react'
import { render } from '@testing-library/react-native'

import { ExperienceModes } from '../../../../helpers/setGlobalReactNState'

import { ExperienceModeOption } from './index'

jest.mock('reactn')
const mockUseGlobal = useGlobal as jest.Mock

test('ExperienceModeOption renders a component with Explore mode text displayed', () => {
  mockUseGlobal.mockReturnValue([ExperienceModes.Explore])
  const { getByText } = render(<ExperienceModeOption />)

  expect(getByText(ExperienceModes.Explore)).toBeTruthy()
})

test('ExperienceModeOption renders a component with Quiz mode text displayed', () => {
  mockUseGlobal.mockReturnValue([ExperienceModes.Quiz])
  const { getByText } = render(<ExperienceModeOption />)

  expect(getByText(ExperienceModes.Quiz)).toBeTruthy()
})
