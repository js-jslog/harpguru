import { DegreeIds } from '../types'
import type { Degree } from '../types'

import { getAscendingDegreeIds, getDescendingDegreeIds, getDegree } from './index'

const { Root, Flat2, Second, Flat3, Third, Fourth, Flat5, Fifth, Flat6, Sixth, Flat7, Seventh } = DegreeIds


test('getAscendingDegreeIds function returns an ordered array of the available degreeIds defaulting to starting at root', () => {
  const expectedArray = [
    Root, Flat2, Second, Flat3, Third, Fourth,
    Flat5, Fifth, Flat6, Sixth, Flat7, Seventh
  ]
  const actualArray = getAscendingDegreeIds()

  expect(actualArray).toEqual(expectedArray)
})

test('getAscendingDegreeIds function returns an ordered array of the available degreeIds starting from an input value', () => {
  const expectedArray = [
    Flat5, Fifth, Flat6, Sixth, Flat7, Seventh,
    Root, Flat2, Second, Flat3, Third, Fourth
  ]
  const actualArray = getAscendingDegreeIds(DegreeIds.Flat5)

  expect(actualArray).toEqual(expectedArray)
})

test('getDescendingDegreeIds function returns an ordered array of the available degreeIds defaulting to starting at root', () => {
  const expectedArray = [
    Root, Seventh, Flat7, Sixth, Flat6, Fifth,
    Flat5, Fourth, Third, Flat3, Second, Flat2
  ]
  const actualArray = getDescendingDegreeIds()

  expect(actualArray).toEqual(expectedArray)
})

test('getDescendingDegreeIds function returns an ordered array of the available degreeIds starting from an input value', () => {
  const expectedArray = [
    Flat5, Fourth, Third, Flat3, Second, Flat2,
    Root, Seventh, Flat7, Sixth, Flat6, Fifth
  ]
  const actualArray = getDescendingDegreeIds(DegreeIds.Flat5)

  expect(actualArray).toEqual(expectedArray)
})

test('getDegree function can return a root degree', () => {
  const ROOT_DEGREE: Degree = { id: DegreeIds.Root } as const
  const actualDegree = getDegree(ROOT_DEGREE.id)

  expect(actualDegree).toStrictEqual(ROOT_DEGREE)
})
