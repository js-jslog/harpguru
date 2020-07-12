import 'react-native'
import React from 'react'
import { DegreeIds } from 'harpstrata'
import { render } from '@testing-library/react-native'

import { harpFaceProps } from '../../testResources'

import { HarpRow } from './index'

test('The first 3 holes of a blow row from a major diatonic harmonica can be rendered', () => {
  const { getByText } = render(
    <HarpRow {...harpFaceProps} yCoord={2} xRange={[0, 1, 2]} />
  )

  expect(getByText(DegreeIds.Root)).toBeTruthy()
  expect(getByText(DegreeIds.Third)).toBeTruthy()
  expect(getByText(DegreeIds.Fifth)).toBeTruthy()
})

test('A snapshot of a non-home row', () => {
  const { container } = render(
    <HarpRow
      {...harpFaceProps}
      yCoord={0}
      xRange={[0, 1, 2, 3, 4, 5, 6, 7, 8, 9]}
    />
  )

  expect(container).toMatchSnapshot()
})

test('A snapshot of a blow home row', () => {
  const { container } = render(
    <HarpRow
      {...harpFaceProps}
      yCoord={2}
      xRange={[0, 1, 2, 3, 4, 5, 6, 7, 8, 9]}
    />
  )

  expect(container).toMatchSnapshot()
})

test('A snapshot of a draw home row', () => {
  const { container } = render(
    <HarpRow
      {...harpFaceProps}
      yCoord={3}
      xRange={[0, 1, 2, 3, 4, 5, 6, 7, 8, 9]}
    />
  )

  expect(container).toMatchSnapshot()
})
