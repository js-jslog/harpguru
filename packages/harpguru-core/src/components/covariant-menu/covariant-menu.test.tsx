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

import { DisplayModes } from '../../types'
import { CovariantMembers } from '../../packages/covariance-series'

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
const { HarpKey: lockedCovariant } = CovariantMembers
const setLockedCovariant = jest.fn()

test('CovariantMenu renders a component with position and key information displayed', () => {
  mockUseGlobal.mockImplementation((stateItem: string) => {
    if (stateItem === 'activeHarpStrata') return [harpStrata]
    if (stateItem === 'lockedCovariant')
      return [lockedCovariant, setLockedCovariant]
    if (stateItem === 'activeDisplayMode')
      return [DisplayModes.Degree, jest.fn()]
    return undefined
  })
  const tapHandler = jest.fn()
  const { getByText } = render(
    <CovariantMenu hideMenu={false} hideLabel={false} tapHandler={tapHandler} />
  )

  expect(getByText(PitchIds.C)).toBeTruthy()
  expect(getByText(PitchIds.G)).toBeTruthy()
  expect(getByText(PozitionIds.Second)).toBeTruthy()
})
