import { useGlobal } from 'reactn'
import 'react-native'
import React from 'react'
import { DegreeIds } from 'harpstrata'
import { render } from '@testing-library/react-native'

import { inactiveCellsHarpStrata } from '../../testResources'
import { DisplayModes } from '../../../types'
import { ExperienceModes } from '../../../helpers/setGlobalReactNState'

import { HarpFaceFragment } from './index'

jest.mock('reactn')
const mockUseGlobal = useGlobal as jest.Mock
mockUseGlobal.mockImplementation((stateItem: string) => {
  if (stateItem === 'activeHarpStrata') return [inactiveCellsHarpStrata]
  if (stateItem === 'activeExperienceMode') return [ExperienceModes.Explore]
  if (stateItem === 'quizQuestion') return [DegreeIds.Root]
  if (stateItem === 'activeDisplayMode') return [DisplayModes.Degree]
  return undefined
})

test('A snapshot of a HarpFaceFragment', () => {
  const { container } = render(
    <HarpFaceFragment xRange={[0, 1, 2, 3, 4, 5, 6, 7, 8, 9]} />
  )

  expect(container).toMatchSnapshot()
})
