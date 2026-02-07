import React from 'react'
import { render } from '@testing-library/react-native'

import { mockStoreImplementation } from '../../test-resources'
import { useHarpGuruStore } from '../../store'

import { HoleNumber, HoleNumberIds } from './hole-number'

jest.mock('../../store', () => ({ useHarpGuruStore: jest.fn() }))
const mockUseHarpGuruStore = useHarpGuruStore as jest.Mock
mockUseHarpGuruStore.mockImplementation(mockStoreImplementation({}))

test('HoleNumber renders a dom element with the expected value included', () => {
  const { getByText } = render(<HoleNumber xCoord={0} />)
  expect(getByText(HoleNumberIds.One)).toBeTruthy()
})

test('A snapshot of HoleNumber', () => {
  const { toJSON } = render(<HoleNumber xCoord={0} />)
  expect(toJSON()).toMatchSnapshot()
})
