import { useGlobal } from 'reactn'
import 'react-native'
import React from 'react'
import { render } from '@testing-library/react-native'

import {
  inactiveCellsHarpStrata,
  buildMockUseGlobalImplementation,
} from '../../test-resources'

import { HarpFaceFragment } from './index'

jest.mock('reactn')
const mockUseGlobal = useGlobal as jest.Mock

test('A snapshot of an unbounded HarpFaceFragment', () => {
  mockUseGlobal.mockImplementation(
    buildMockUseGlobalImplementation({
      sourceHarpStrata: inactiveCellsHarpStrata,
    })
  )
  const { toJSON } = render(
    <HarpFaceFragment xRange={[0, 1, 2, 3, 4, 5, 6, 7, 8, 9]} harpfaceIndex={0} />
  )

  expect(toJSON()).toMatchSnapshot()
})

test('A snapshot of a bounded HarpFaceFragment - we should expect fewer rows since the double blowbend is not present', () => {
  mockUseGlobal.mockImplementation(
    buildMockUseGlobalImplementation({
      sourceHarpStrata: inactiveCellsHarpStrata,
      sourceColumnBounds: [0, 8],
    })
  )

  const { toJSON } = render(
    <HarpFaceFragment xRange={[0, 1, 2, 3, 4, 5, 6, 7, 8]} harpfaceIndex={0} />
  )

  expect(toJSON()).toMatchSnapshot()
})
