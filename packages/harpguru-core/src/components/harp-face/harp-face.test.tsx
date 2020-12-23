import { useGlobal } from 'reactn'
import 'react-native'
import React from 'react'
import { CovariantMembers } from 'harpcovariance'
import { render } from '@testing-library/react-native'

import { DisplayModes, ExperienceModes } from '../../types'
import { inactiveCellsHarpStrata } from '../../test-resources'

import { HarpFace } from './harp-face'

jest.mock('reactn')
const mockUseGlobal = useGlobal as jest.Mock
mockUseGlobal.mockImplementation((stateItem: string) => {
  if (stateItem === 'activeHarpStrata') return [inactiveCellsHarpStrata]
  if (stateItem === 'activeExperienceMode') return [ExperienceModes.Explore]
  if (stateItem === 'activeDisplayMode') return [DisplayModes.Degree]
  if (stateItem === 'lockedCovariant') return [CovariantMembers.HarpKey]
  if (stateItem === 'bufferedActivityToggles') return [[]]
  if (stateItem === 'fragmentHarpFaceByOctaves') return [true]
  return undefined
})

test('A component is rendered', () => {
  const { container } = render(<HarpFace />)

  expect(container).toMatchSnapshot()
})
