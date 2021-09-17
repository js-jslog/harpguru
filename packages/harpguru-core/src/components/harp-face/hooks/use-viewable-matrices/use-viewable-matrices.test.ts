import { useGlobal } from 'reactn'
import { DegreeIds } from 'harpparts'

import { inactiveCellsHarpStrata } from '../../../../test-resources'

import { useViewableMatrices } from './use-viewable-matrices'

jest.mock('reactn')
const mockUseGlobal = useGlobal as jest.Mock

test('Entire degreeMatrix is viewable when columnBounds is FIT', () => {
  mockUseGlobal.mockImplementation((stateItem: string) => {
    if (stateItem === 'activeHarpStrata') return [inactiveCellsHarpStrata]
    if (stateItem === 'columnBounds') return ['FIT']
    return undefined
  })

  expect(useViewableMatrices().viewableDegreeMatrix).toStrictEqual(
    inactiveCellsHarpStrata.degreeMatrix
  )
})

test('First column of degreeMatrix is viewable when columnBounds is [0, 0]', () => {
  const { Root, Second, Third } = DegreeIds
  const simplifiedDegreeMatrix = [
    [Root, Second, Third],
    [Second, Third, Root],
    [Third, Second, Root],
  ]
  const modifiedHarpStrata = {
    ...inactiveCellsHarpStrata,
    degreeMatrix: simplifiedDegreeMatrix,
  }
  const expectedViewableMatrix = [[Root], [Second], [Third]]
  mockUseGlobal.mockImplementation((stateItem: string) => {
    if (stateItem === 'activeHarpStrata') return [modifiedHarpStrata]
    if (stateItem === 'columnBounds') return [[0, 0]]
    return undefined
  })

  expect(useViewableMatrices().viewableDegreeMatrix).toStrictEqual(
    expectedViewableMatrix
  )
})
