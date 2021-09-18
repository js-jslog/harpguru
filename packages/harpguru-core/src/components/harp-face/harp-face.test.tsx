import { useGlobal } from 'reactn'
import 'react-native'
import React from 'react'
import { render } from '@testing-library/react-native'

import { DisplayModes, ExperienceModes } from '../../types'
import { inactiveCellsHarpStrata } from '../../test-resources'

import { HarpFace } from './harp-face'

jest.mock('reactn')
const mockUseGlobal = useGlobal as jest.Mock

test('A component is rendered with fragmented face', () => {
  mockUseGlobal.mockImplementation((stateItem: string) => {
    if (stateItem === 'activeHarpStrata') return [inactiveCellsHarpStrata]
    if (stateItem === 'activeExperienceMode') return [ExperienceModes.Explore]
    if (stateItem === 'activeDisplayMode') return [DisplayModes.Degree]
    if (stateItem === 'bufferedActivityToggles') return [[]]
    if (stateItem === 'fragmentHarpFaceByOctaves') return [true]
    if (stateItem === 'columnBounds') return ['FIT']
    return undefined
  })
  const { toJSON } = render(<HarpFace />)

  expect(toJSON()).toMatchSnapshot()
})

test('A component is rendered with unfragmented face', () => {
  mockUseGlobal.mockImplementation((stateItem: string) => {
    if (stateItem === 'activeHarpStrata') return [inactiveCellsHarpStrata]
    if (stateItem === 'activeExperienceMode') return [ExperienceModes.Explore]
    if (stateItem === 'activeDisplayMode') return [DisplayModes.Degree]
    if (stateItem === 'bufferedActivityToggles') return [[]]
    if (stateItem === 'fragmentHarpFaceByOctaves') return [false]
    if (stateItem === 'columnBounds') return ['FIT']
    return undefined
  })
  const { toJSON } = render(<HarpFace />)

  expect(toJSON()).toMatchSnapshot()
})

test('A component is rendered with fragmented and bounded face', () => {
  mockUseGlobal.mockImplementation((stateItem: string) => {
    if (stateItem === 'activeHarpStrata') return [inactiveCellsHarpStrata]
    if (stateItem === 'activeExperienceMode') return [ExperienceModes.Explore]
    if (stateItem === 'activeDisplayMode') return [DisplayModes.Degree]
    if (stateItem === 'bufferedActivityToggles') return [[]]
    if (stateItem === 'fragmentHarpFaceByOctaves') return [true]
    if (stateItem === 'columnBounds') return [[2, 7]]
    return undefined
  })
  const { toJSON } = render(<HarpFace />)

  expect(toJSON()).toMatchSnapshot()
})

test('A component is rendered with unfragmented and bounded face', () => {
  mockUseGlobal.mockImplementation((stateItem: string) => {
    if (stateItem === 'activeHarpStrata') return [inactiveCellsHarpStrata]
    if (stateItem === 'activeExperienceMode') return [ExperienceModes.Explore]
    if (stateItem === 'activeDisplayMode') return [DisplayModes.Degree]
    if (stateItem === 'bufferedActivityToggles') return [[]]
    if (stateItem === 'fragmentHarpFaceByOctaves') return [false]
    if (stateItem === 'columnBounds') return [[2, 7]]
    return undefined
  })
  const { toJSON } = render(<HarpFace />)

  expect(toJSON()).toMatchSnapshot()
})
