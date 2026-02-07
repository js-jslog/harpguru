import 'react-native'
import React from 'react'
import { render } from '@testing-library/react-native'

import {
  inactiveCellsHarpStrata,
  mockStoreImplementation,
} from '../../test-resources'
import { useHarpGuruStore } from '../../store'

import { HarpFaceFragment } from './index'

jest.mock('../../store', () => ({ useHarpGuruStore: jest.fn() }))
const mockUseHarpGuruStore = useHarpGuruStore as jest.Mock

test('A snapshot of an unbounded HarpFaceFragment', () => {
  mockUseHarpGuruStore.mockImplementation(
    mockStoreImplementation({
      sourceHarpStrata: inactiveCellsHarpStrata,
    })
  )
  const { toJSON } = render(
    <HarpFaceFragment
      xRange={[0, 1, 2, 3, 4, 5, 6, 7, 8, 9]}
      harpfaceIndex={'harpface1'}
    />
  )

  expect(toJSON()).toMatchSnapshot()
})

test('A snapshot of a bounded HarpFaceFragment - we should expect fewer rows since the double blowbend is not present', () => {
  mockUseHarpGuruStore.mockImplementation(
    mockStoreImplementation({
      sourceHarpStrata: inactiveCellsHarpStrata,
      sourceColumnBounds: [0, 8],
    })
  )

  const { toJSON } = render(
    <HarpFaceFragment
      xRange={[0, 1, 2, 3, 4, 5, 6, 7, 8]}
      harpfaceIndex={'harpface1'}
    />
  )

  expect(toJSON()).toMatchSnapshot()
})
