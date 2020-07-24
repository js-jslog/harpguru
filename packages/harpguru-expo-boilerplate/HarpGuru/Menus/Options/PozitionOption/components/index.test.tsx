import { useGlobal } from 'reactn'
import React from 'react'
import { PitchIds, PozitionIds, ApparatusIds, getHarpStrata } from 'harpstrata'
import { render } from '@testing-library/react-native'

import { DisplayModes } from '../../../../types'

import { PozitionOption } from './index'

jest.mock('reactn')
const mockUseGlobal = useGlobal as jest.Mock

const harpStrataProps = {
  apparatusId: ApparatusIds.MajorDiatonic,
  pozitionId: PozitionIds.Second,
  harpKeyId: PitchIds.C,
  activeIds: [],
}

const harpStrata = getHarpStrata(harpStrataProps)

test('PozitionOption renders a component with position information displayed', () => {
  const menuOptionProps = {
    activeDisplayMode: DisplayModes.Degree,
  }
  mockUseGlobal.mockReturnValue([harpStrata])
  const { getByText } = render(<PozitionOption {...menuOptionProps} />)

  expect(getByText(PozitionIds.Second)).toBeTruthy()
})