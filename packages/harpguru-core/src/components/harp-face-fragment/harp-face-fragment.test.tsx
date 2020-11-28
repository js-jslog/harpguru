import { useGlobal } from 'reactn'
import 'react-native'
import React from 'react'
import { CovariantMembers } from 'harpcovariance'
import { render } from '@testing-library/react-native'

import { DisplayModes, ExperienceModes } from '../../types'
import { inactiveCellsHarpStrata } from '../../test-resources'

import { HarpFaceFragment } from './index'

jest.mock('reactn')
const mockUseGlobal = useGlobal as jest.Mock
mockUseGlobal.mockImplementation((stateItem: string) => {
  if (stateItem === 'activeHarpStrata') return [inactiveCellsHarpStrata]
  if (stateItem === 'activeExperienceMode') return [ExperienceModes.Explore]
  if (stateItem === 'activeDisplayMode') return [DisplayModes.Degree]
  if (stateItem === 'lockedCovariant') return [CovariantMembers.HarpKey]
  if (stateItem === 'bufferedActivityToggles') return [[]]
  return undefined
})

test('A snapshot of a HarpFaceFragment', () => {
  const { container } = render(
    <HarpFaceFragment xRange={[0, 1, 2, 3, 4, 5, 6, 7, 8, 9]} />
  )

  expect(container).toMatchSnapshot()
})
