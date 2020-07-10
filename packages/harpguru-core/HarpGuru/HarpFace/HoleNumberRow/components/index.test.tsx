import React from 'react'
import { render } from '@testing-library/react-native'

import { harpFaceProps } from '../../testResources'

import { HoleNumberRow } from './index'

test('HoleNumberRow returns holes numbered 1 to 10 for a 10 hole major diatonic harmonica', () => {
  const { queryByText, getByText } = render(
    <HoleNumberRow {...harpFaceProps} />
  )

  expect(queryByText('0')).toBeNull()
  expect(getByText('1')).toBeTruthy()
  expect(getByText('2')).toBeTruthy()
  expect(getByText('3')).toBeTruthy()
  expect(getByText('4')).toBeTruthy()
  expect(getByText('5')).toBeTruthy()
  expect(getByText('6')).toBeTruthy()
  expect(getByText('7')).toBeTruthy()
  expect(getByText('8')).toBeTruthy()
  expect(getByText('9')).toBeTruthy()
  expect(getByText('10')).toBeTruthy()
  expect(queryByText('11')).toBeNull()
})

test('A snapshot of HoleNumberRow', () => {
  const { container } = render(<HoleNumberRow {...harpFaceProps} />)

  expect(container).toMatchSnapshot()
})
