import { useGlobal } from 'reactn'
import React from 'react'
import {
  PitchIds,
  PozitionIds,
  HarpStrataProps,
  ApparatusIds,
  ActiveIds,
  getHarpStrata,
} from 'harpstrata'
import { render } from '@testing-library/react-native'

import { DisplayModes } from '../../../../types'

import { CovariantMenu } from './index'

jest.mock('reactn')
const mockUseGlobal = useGlobal as jest.Mock

const harpStrataProps: HarpStrataProps = {
  apparatusId: ApparatusIds.MajorDiatonic,
  pozitionId: PozitionIds.Second,
  harpKeyId: PitchIds.C,
  activeIds: [] as ActiveIds,
}

const harpStrata = getHarpStrata(harpStrataProps)

test('CovariantMenu renders a component with position and key information displayed', () => {
  mockUseGlobal.mockImplementation((stateItem: string) => {
    if (stateItem === 'activeHarpStrata') return [harpStrata]
    if (stateItem === 'activeDisplayMode')
      return [DisplayModes.Degree, jest.fn()]
    return undefined
  })
  const { getByText } = render(<CovariantMenu />)

  expect(getByText(PitchIds.C)).toBeTruthy()
  expect(getByText(PitchIds.G)).toBeTruthy()
  expect(getByText(PozitionIds.Second)).toBeTruthy()
})
