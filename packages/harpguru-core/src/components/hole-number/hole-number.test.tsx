import { useGlobal } from 'reactn'
import React from 'react'
import { render } from '@testing-library/react-native'

import { activeCellsHarpStrata } from '../../test-resources'

import { HoleNumber, HoleNumberIds } from './hole-number'

jest.mock('reactn')
const mockUseGlobal = useGlobal as jest.Mock
mockUseGlobal.mockImplementation((stateItem: string) => {
  if (stateItem === 'activeHarpStrata') return [activeCellsHarpStrata]
  return undefined
})

test('HoleNumber renders a dom element with the expected value included', () => {
  const { getByText } = render(<HoleNumber xCoord={0} />)
  expect(getByText(HoleNumberIds.One)).toBeTruthy()
})

test('A snapshot of HoleNumber', () => {
  const { toJSON } = render(<HoleNumber xCoord={0} />)
  expect(toJSON()).toMatchSnapshot()
})
