import { useGlobal } from 'reactn'
import React from 'react'
import { PitchIds, PozitionIds, ApparatusIds, getHarpStrata } from 'harpstrata'
import { render } from '@testing-library/react-native'

import { DisplayModes } from '../../../../types'

import { HarpKeyOption } from './index'

jest.mock('reactn')
const mockUseGlobal = useGlobal as jest.Mock

const harpStrataProps = {
  apparatusId: ApparatusIds.MajorDiatonic,
  pozitionId: PozitionIds.Second,
  harpKeyId: PitchIds.C,
  activeIds: [],
}

const harpStrata = getHarpStrata(harpStrataProps)

test('HarpKeyOption renders a component with harp key information displayed', () => {
  const menuOptionProps = {
    activeDisplayMode: DisplayModes.Degree,
  }
  mockUseGlobal.mockReturnValue([harpStrata])
  const { getByText } = render(<HarpKeyOption {...menuOptionProps} />)

  expect(getByText(PitchIds.C)).toBeTruthy()
})
