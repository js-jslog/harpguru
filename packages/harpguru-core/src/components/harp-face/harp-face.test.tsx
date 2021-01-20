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
    return undefined
  })
  const { container } = render(<HarpFace />)

  expect(container).toMatchSnapshot()
})

test('A component is rendered with unfragmented face', () => {
  mockUseGlobal.mockImplementation((stateItem: string) => {
    if (stateItem === 'activeHarpStrata') return [inactiveCellsHarpStrata]
    if (stateItem === 'activeExperienceMode') return [ExperienceModes.Explore]
    if (stateItem === 'activeDisplayMode') return [DisplayModes.Degree]
    if (stateItem === 'bufferedActivityToggles') return [[]]
    if (stateItem === 'fragmentHarpFaceByOctaves') return [false]
    return undefined
  })
  const { container } = render(<HarpFace />)

  expect(container).toMatchSnapshot()
})
