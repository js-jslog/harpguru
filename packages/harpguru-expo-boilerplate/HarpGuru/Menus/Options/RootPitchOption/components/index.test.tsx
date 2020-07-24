import { useGlobal } from 'reactn'
import React from 'react'
import { PitchIds, PozitionIds, ApparatusIds, getHarpStrata } from 'harpstrata'
import { render } from '@testing-library/react-native'

import { DisplayModes } from '../../../../types'

import { RootPitchOption } from './index'

jest.mock('reactn')
const mockUseGlobal = useGlobal as jest.Mock

const harpStrataProps = {
  apparatusId: ApparatusIds.MajorDiatonic,
  pozitionId: PozitionIds.Second,
  harpKeyId: PitchIds.C,
  activeIds: [],
}

const harpStrata = getHarpStrata(harpStrataProps)

test('RootPitchOption renders a component with root pitch information displayed', () => {
  mockUseGlobal.mockImplementation((stateItem: string) => {
    if (stateItem === 'activeHarpStrata') return [harpStrata]
    if (stateItem === 'activeDisplayMode') return [DisplayModes.Degree]
    return undefined
  })
  const { getByText } = render(<RootPitchOption />)

  expect(getByText(PitchIds.G)).toBeTruthy()
})
