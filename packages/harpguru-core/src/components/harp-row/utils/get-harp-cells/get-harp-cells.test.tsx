import { useGlobal } from 'reactn'
import { DegreeIds } from 'harpparts'
import { render } from '@testing-library/react-native'

import { DisplayModes, ExperienceModes } from '../../../../types'
import { inactiveCellsHarpStrata } from '../../../../test-resources'

import { getHarpCells } from './get-harp-cells'

jest.mock('reactn')
const mockUseGlobal = useGlobal as jest.Mock
mockUseGlobal.mockImplementation((stateItem: string) => {
  if (stateItem === 'activeHarpStrata')
    return [inactiveCellsHarpStrata, jest.fn()]
  if (stateItem === 'activeExperienceMode') return [ExperienceModes.Explore]
  if (stateItem === 'activeDisplayMode') return [DisplayModes.Degree]
  if (stateItem === 'bufferedActivityToggles') return [[]]
  if (stateItem === 'fragmentHarpFaceByOctaves') return [true]
  if (stateItem === 'columnBounds') return ['FIT']
  return undefined
})

test('getHarpCells returns an array of HarpCells, the length of the range supplied', () => {
  const yCoord = 0
  const xRange = [0, 1, 2, 3, 4, 5, 6, 7, 8]
  const harpCells = getHarpCells(yCoord, xRange)
  expect(harpCells.length).toBe(9)
})

test('getHarpCells returns an array of HarpCells, with a sample containing the expected values', () => {
  // This test should be covering the blow row holes 2, 3 and 4 of a major diatonic tuned c harp
  const yCoord = 2
  const xRange = [1, 2, 3]
  const harpCells = getHarpCells(yCoord, xRange)
  const { getByText: getByText_0 } = render(harpCells[0])
  const { getByText: getByText_1 } = render(harpCells[1])
  const { getByText: getByText_2 } = render(harpCells[2])

  expect(getByText_0(DegreeIds.Third)).toBeTruthy()
  expect(getByText_1(DegreeIds.Fifth)).toBeTruthy()
  expect(getByText_2(DegreeIds.Root)).toBeTruthy()
})
