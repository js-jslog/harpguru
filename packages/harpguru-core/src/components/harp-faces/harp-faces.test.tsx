import 'react-native'
import React from 'react'
import { render } from '@testing-library/react-native'

import {
  inactiveCellsHarpStrata,
  chromaticHarpStrata,
  mockStoreImplementation,
} from '../../test-resources'
import { useHarpGuruStore } from '../../store'

import { HarpFaces } from './harp-faces'

jest.mock('../../store', () => ({ useHarpGuruStore: jest.fn() }))
const mockUseHarpGuruStore = useHarpGuruStore as jest.Mock

test('A diatonic harp is rendered', () => {
  mockUseHarpGuruStore.mockImplementation(
    mockStoreImplementation({
      sourceHarpStrata: inactiveCellsHarpStrata,
    })
  )
  const { toJSON } = render(<HarpFaces />)

  expect(toJSON()).toMatchSnapshot()
})

test('A chromatic harp is rendered', () => {
  mockUseHarpGuruStore.mockImplementation(
    mockStoreImplementation({
      sourceHarpStrata: chromaticHarpStrata,
    })
  )
  const { toJSON } = render(<HarpFaces />)

  expect(toJSON()).toMatchSnapshot()
})
