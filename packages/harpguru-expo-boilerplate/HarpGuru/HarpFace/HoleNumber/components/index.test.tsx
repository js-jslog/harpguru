import React from 'react'
import { render } from '@testing-library/react-native'

import { HoleNumberIds } from '../types'

import { HoleNumber } from './index'

test('HoleNumber renders a dom element with the expected value included', () => {
  const { getByText } = render(<HoleNumber xCoord={0} />)
  expect(getByText(HoleNumberIds.One)).toBeTruthy()
})
