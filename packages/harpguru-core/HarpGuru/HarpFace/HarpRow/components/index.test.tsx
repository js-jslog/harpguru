import 'react-native'
import React from 'react'
import { DegreeIds } from 'harpstrata'
import { render } from '@testing-library/react-native'

import { harpFaceProps } from '../../testResources'

import { HarpRow } from './index'

test('A blow row from a major diatonic harmonica can be rendered', () => {
  const { getAllByText } = render(<HarpRow {...harpFaceProps} yCoord={2} />)

  expect(getAllByText(DegreeIds.Root)[0]).toBeTruthy()
  expect(getAllByText(DegreeIds.Third)[0]).toBeTruthy()
  expect(getAllByText(DegreeIds.Fifth)[0]).toBeTruthy()
})

test('A snapshot of a non-home row', () => {
  const { container } = render(<HarpRow {...harpFaceProps} yCoord={0} />)

  expect(container).toMatchSnapshot()
})

test('A snapshot of a blow home row', () => {
  const { container } = render(<HarpRow {...harpFaceProps} yCoord={2} />)

  expect(container).toMatchSnapshot()
})

test('A snapshot of a draw home row', () => {
  const { container } = render(<HarpRow {...harpFaceProps} yCoord={3} />)

  expect(container).toMatchSnapshot()
})
