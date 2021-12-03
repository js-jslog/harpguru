import { useGlobal } from 'reactn'
import 'react-native'
import React from 'react'
import { render } from '@testing-library/react-native'

import {
  inactiveCellsHarpStrata,
  chromaticHarpStrata,
  buildMockUseGlobalImplementation,
} from '../../test-resources'

import { HarpFaces } from './harp-faces'

jest.mock('reactn')
const mockUseGlobal = useGlobal as jest.Mock

test('A diatonic harp is rendered', () => {
  mockUseGlobal.mockImplementation(
    buildMockUseGlobalImplementation({
      sourceHarpStrata: inactiveCellsHarpStrata,
    })
  )
  const { toJSON } = render(<HarpFaces />)

  expect(toJSON()).toMatchSnapshot()
})

test('A chromatic harp is rendered', () => {
  mockUseGlobal.mockImplementation(
    buildMockUseGlobalImplementation({
      sourceHarpStrata: chromaticHarpStrata,
    })
  )
  const { toJSON } = render(<HarpFaces />)

  expect(toJSON()).toMatchSnapshot()
})
