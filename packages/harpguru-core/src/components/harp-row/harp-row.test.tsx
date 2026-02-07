import 'react-native'
import React from 'react'
import { DegreeIds } from 'harpparts'
import { render } from '@testing-library/react-native'

import {
  inactiveCellsHarpStrata,
  mockStoreImplementation,
} from '../../test-resources'
import { useHarpGuruStore } from '../../store'

import { HarpRow } from './harp-row'

jest.mock('../../store', () => ({ useHarpGuruStore: jest.fn() }))
const mockUseHarpGuruStore = useHarpGuruStore as jest.Mock
mockUseHarpGuruStore.mockImplementation(
  mockStoreImplementation({
    sourceHarpStrata: inactiveCellsHarpStrata,
  })
)

test('The first 3 holes of a blow row from a major diatonic tuned harmonica can be rendered', () => {
  const { getByText } = render(
    <HarpRow yCoord={2} xRange={[0, 1, 2]} harpfaceIndex={'harpface1'} />
  )

  expect(getByText(DegreeIds.Fourth)).toBeTruthy()
  expect(getByText(DegreeIds.Sixth)).toBeTruthy()
  expect(getByText(DegreeIds.Root)).toBeTruthy()
})

test('A snapshot of a non-home row', () => {
  const { toJSON } = render(
    <HarpRow
      yCoord={0}
      xRange={[0, 1, 2, 3, 4, 5, 6, 7, 8, 9]}
      harpfaceIndex={'harpface1'}
    />
  )

  expect(toJSON()).toMatchSnapshot()
})

test('A snapshot of a blow home row', () => {
  const { toJSON } = render(
    <HarpRow
      yCoord={2}
      xRange={[0, 1, 2, 3, 4, 5, 6, 7, 8, 9]}
      harpfaceIndex={'harpface1'}
    />
  )

  expect(toJSON()).toMatchSnapshot()
})

test('A snapshot of a draw home row', () => {
  const { toJSON } = render(
    <HarpRow
      yCoord={3}
      xRange={[0, 1, 2, 3, 4, 5, 6, 7, 8, 9]}
      harpfaceIndex={'harpface1'}
    />
  )

  expect(toJSON()).toMatchSnapshot()
})
