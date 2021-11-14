import { useGlobal } from 'reactn'
import 'react-native'
import React from 'react'
import { render } from '@testing-library/react-native'

import {
  inactiveCellsHarpStrata,
  buildMockUseGlobalImplementation,
} from '../../test-resources'

import { HarpFace } from './harp-face'

jest.mock('reactn')
const mockUseGlobal = useGlobal as jest.Mock

test('A component is rendered with fragmented face', () => {
  mockUseGlobal.mockImplementation(
    buildMockUseGlobalImplementation({
      sourceHarpStrata: inactiveCellsHarpStrata,
    })
  )
  const { toJSON } = render(<HarpFace harpfaceIndex={'harpface1'} />)

  expect(toJSON()).toMatchSnapshot()
})

test('A component is rendered with unfragmented face', () => {
  mockUseGlobal.mockImplementation(
    buildMockUseGlobalImplementation({
      sourceHarpStrata: inactiveCellsHarpStrata,
      fragmentHarpFaceByOctaves: false,
    })
  )
  const { toJSON } = render(<HarpFace harpfaceIndex={'harpface1'} />)

  expect(toJSON()).toMatchSnapshot()
})

test('A component is rendered with fragmented and bounded face', () => {
  mockUseGlobal.mockImplementation(
    buildMockUseGlobalImplementation({
      sourceHarpStrata: inactiveCellsHarpStrata,
      sourceColumnBounds: [2, 7],
    })
  )
  const { toJSON } = render(<HarpFace harpfaceIndex={'harpface1'} />)

  expect(toJSON()).toMatchSnapshot()
})

test('A component is rendered with unfragmented and bounded face', () => {
  mockUseGlobal.mockImplementation(
    buildMockUseGlobalImplementation({
      sourceHarpStrata: inactiveCellsHarpStrata,
      fragmentHarpFaceByOctaves: false,
      sourceColumnBounds: [2, 7],
    })
  )
  const { toJSON } = render(<HarpFace harpfaceIndex={'harpface1'} />)

  expect(toJSON()).toMatchSnapshot()
})
