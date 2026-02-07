import 'react-native'
import React from 'react'
import { render } from '@testing-library/react-native'

import {
  inactiveCellsHarpStrata,
  mockStoreImplementation,
} from '../../test-resources'
import { useHarpGuruStore } from '../../store'

import { HarpFace } from './harp-face'

jest.mock('../../store', () => ({ useHarpGuruStore: jest.fn() }))
const mockUseHarpGuruStore = useHarpGuruStore as jest.Mock

test('A component is rendered with fragmented face', () => {
  mockUseHarpGuruStore.mockImplementation(
    mockStoreImplementation({
      sourceHarpStrata: inactiveCellsHarpStrata,
    })
  )
  const { toJSON } = render(<HarpFace harpfaceIndex={'harpface1'} />)

  expect(toJSON()).toMatchSnapshot()
})

test('A component is rendered with unfragmented face', () => {
  mockUseHarpGuruStore.mockImplementation(
    mockStoreImplementation({
      sourceHarpStrata: inactiveCellsHarpStrata,
      fragmentHarpFaceByOctaves: false,
    })
  )
  const { toJSON } = render(<HarpFace harpfaceIndex={'harpface1'} />)

  expect(toJSON()).toMatchSnapshot()
})

test('A component is rendered with fragmented and bounded face', () => {
  mockUseHarpGuruStore.mockImplementation(
    mockStoreImplementation({
      sourceHarpStrata: inactiveCellsHarpStrata,
      sourceColumnBounds: [2, 7],
    })
  )
  const { toJSON } = render(<HarpFace harpfaceIndex={'harpface1'} />)

  expect(toJSON()).toMatchSnapshot()
})

test('A component is rendered with unfragmented and bounded face', () => {
  mockUseHarpGuruStore.mockImplementation(
    mockStoreImplementation({
      sourceHarpStrata: inactiveCellsHarpStrata,
      fragmentHarpFaceByOctaves: false,
      sourceColumnBounds: [2, 7],
    })
  )
  const { toJSON } = render(<HarpFace harpfaceIndex={'harpface1'} />)

  expect(toJSON()).toMatchSnapshot()
})
