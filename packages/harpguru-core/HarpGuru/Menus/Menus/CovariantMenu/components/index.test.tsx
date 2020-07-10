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

import { DisplayModes } from '../../../../HarpFace'

import { CovariantMenu } from './index'

const harpStrataProps: HarpStrataProps = {
  apparatusId: ApparatusIds.MajorDiatonic,
  pozitionId: PozitionIds.Second,
  harpKeyId: PitchIds.C,
  activeIds: [] as ActiveIds,
}

const harpStrata = getHarpStrata(harpStrataProps)

test('CovariantMenu renders a component with position and key information displayed', () => {
  const menuProps = {
    activeHarpStrata: harpStrata,
    setActiveHarpStrata: jest.fn(),
    activeDisplayMode: DisplayModes.Degree,
    setActiveDisplayMode: jest.fn(),
  }
  const { getByText } = render(<CovariantMenu {...menuProps} />)

  expect(getByText(PitchIds.C)).toBeTruthy()
  expect(getByText(PitchIds.G)).toBeTruthy()
  expect(getByText(PozitionIds.Second)).toBeTruthy()
})
