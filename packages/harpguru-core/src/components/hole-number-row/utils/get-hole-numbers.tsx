import { useGlobal } from 'reactn'
import React from 'react'
import type { ReactElement } from 'react'

import { HoleNumber } from '../../hole-number'
import type { XRange } from '../../../types'
import { activeCellsHarpStrata } from '../../../test-resources'

jest.mock('reactn')
const mockUseGlobal = useGlobal as jest.Mock
mockUseGlobal.mockImplementation((stateItem: string) => {
  if (stateItem === 'activeHarpStrata') return [activeCellsHarpStrata]
  return undefined
})

export const getHoleNumbers = (xRange: XRange): ReactElement[] => {
  return xRange.map((xCoord) => {
    return <HoleNumber key={xCoord} xCoord={xCoord} />
  })
}
