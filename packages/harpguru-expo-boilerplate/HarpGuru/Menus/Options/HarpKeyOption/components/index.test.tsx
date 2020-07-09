import React from 'react'
import {PitchIds, PozitionIds, ApparatusIds, getHarpStrata} from 'harpstrata'
import {render} from '@testing-library/react-native'

import {DisplayModes} from '../../../../HarpFace'

import { HarpKeyOption } from './index'

const harpStrataProps = {
  apparatusId: ApparatusIds.MajorDiatonic,
  pozitionId: PozitionIds.Second,
  harpKeyId: PitchIds.C,
  activeIds: [],
}

const harpStrata = getHarpStrata(harpStrataProps)

test('HarpKeyOption renders a component with harp key information displayed', () => {
  const menuOptionProps = {
    activeHarpStrata: harpStrata,
    setActiveHarpStrata: jest.fn(),
    activeDisplayMode: DisplayModes.Degree,
    setActiveDisplayMode: jest.fn()
  }
  const { getByText } = render(<HarpKeyOption {...menuOptionProps} />)

  expect(getByText(PitchIds.C)).toBeTruthy()
})
