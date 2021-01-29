import React from 'react'
import { render } from '@testing-library/react-native'

import { HoleNumber, HoleNumberIds } from './hole-number'

test('HoleNumber renders a dom element with the expected value included', () => {
  const { getByText } = render(<HoleNumber xCoord={0} />)
  expect(getByText(HoleNumberIds.One)).toBeTruthy()
})

test('A snapshot of HoleNumber', () => {
  const { toJSON } = render(<HoleNumber xCoord={0} />)
  expect(toJSON()).toMatchSnapshot()
})
