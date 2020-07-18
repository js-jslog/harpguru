import { useGlobal } from 'reactn'
import React from 'react'
import { PitchIds, PozitionIds, ApparatusIds, getHarpStrata } from 'harpstrata'
import { render } from '@testing-library/react-native'

import { ApparatusOption } from './index'

jest.mock('reactn')
const mockUseGlobal = useGlobal as jest.Mock

const harpStrataProps = {
  apparatusId: ApparatusIds.MajorDiatonic,
  pozitionId: PozitionIds.Second,
  harpKeyId: PitchIds.C,
  activeIds: [],
}

const harpStrata = getHarpStrata(harpStrataProps)

test('ApparatusOption renders a component with apparatus information displayed', () => {
  mockUseGlobal.mockReturnValue([harpStrata])
  const { getByText } = render(<ApparatusOption />)

  expect(getByText(ApparatusIds.MajorDiatonic)).toBeTruthy()
})
