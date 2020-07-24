import { useGlobal } from 'reactn'
import 'react-native'
import React from 'react'
import { DegreeIds } from 'harpstrata'
import { render } from '@testing-library/react-native'

import { inactiveCellsHarpStrata } from '../testResources'
import { DisplayModes } from '../../types'
import { ExperienceModes } from '../../helpers/setGlobalReactNState'

import { HarpFace } from './index'

jest.mock('reactn')
const mockUseGlobal = useGlobal as jest.Mock
mockUseGlobal.mockImplementation((stateItem: string) => {
  if (stateItem === 'activeHarpStrata') return [inactiveCellsHarpStrata]
  if (stateItem === 'activeExperienceMode') return [ExperienceModes.Explore]
  if (stateItem === 'quizQuestion') return [DegreeIds.Root]
  if (stateItem === 'activeDisplayMode') return [DisplayModes.Degree]
  return undefined
})

test('A component is rendered', () => {
  const { container } = render(<HarpFace />)

  expect(container).toMatchSnapshot()
})
