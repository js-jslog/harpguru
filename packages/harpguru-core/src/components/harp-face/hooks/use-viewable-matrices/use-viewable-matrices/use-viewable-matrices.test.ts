import { useGlobal } from 'reactn'
import { DegreeIds } from 'harpparts'

import { inactiveCellsHarpStrata } from '../../../../../test-resources'

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

test('Middle columns of degreeMatrix are viewable when columnBounds is [1, 2]', () => {
  const { Root, Second, Third } = DegreeIds
  const simplifiedDegreeMatrix = [
    [Second, Root, Second, Third],
    [Second, Second, Third, Root],
    [Second, Third, Second, Root],
  ]
  const modifiedHarpStrata = {
    ...inactiveCellsHarpStrata,
    degreeMatrix: simplifiedDegreeMatrix,
  }
  const expectedViewableMatrix = [
    [Root, Second],
    [Second, Third],
    [Third, Second],
  ]
  mockUseGlobal.mockImplementation((stateItem: string) => {
    if (stateItem === 'activeHarpStrata') return [modifiedHarpStrata]
    if (stateItem === 'columnBounds') return [[1, 2]]
    return undefined
  })

  expect(useViewableMatrices().viewableDegreeMatrix).toStrictEqual(
    expectedViewableMatrix
  )
})

test('Blank rows are removed from the matrix', () => {
  const { Root, Second, Third } = DegreeIds
  const simplifiedDegreeMatrix = [
    [undefined, undefined, undefined, undefined],
    [Second, Root, Second, Third],
    [Second, Second, Third, Root],
    [Second, Third, Second, Root],
    [Second, Third, Second, Root],
    [undefined, undefined, undefined, undefined],
  ]
  const modifiedHarpStrata = {
    ...inactiveCellsHarpStrata,
    degreeMatrix: simplifiedDegreeMatrix,
  }
  const expectedViewableMatrix = [
    [Root, Second],
    [Second, Third],
    [Third, Second],
    [Third, Second],
  ]
  mockUseGlobal.mockImplementation((stateItem: string) => {
    if (stateItem === 'activeHarpStrata') return [modifiedHarpStrata]
    if (stateItem === 'columnBounds') return [[1, 2]]
    return undefined
  })

  expect(useViewableMatrices().viewableDegreeMatrix).toStrictEqual(
    expectedViewableMatrix
  )
})
