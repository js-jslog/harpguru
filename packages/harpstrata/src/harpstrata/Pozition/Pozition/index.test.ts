import { PozitionIds } from '../types'

import { getAscendingPozitionIds, getPozitionRootOffset, getPozition } from './index'

const first = getPozition(PozitionIds.First)

const { First, Second, Third, Fourth, Fifth, Sixth, Seventh, Eighth, Ninth, Tenth, Eleventh, Twelfth } = PozitionIds

test('getAscendingPozitionIds function returns an ordered array of the pozitions defaulting to starting at First', () => {
  const expectedArray = [
    First, Eighth, Third, Tenth, Fifth, Twelfth, Seventh, Second, Ninth, Fourth, Eleventh, Sixth
  ]
  const actualArray = getAscendingPozitionIds()

  expect(actualArray).toEqual(expectedArray)
})

test('getAscendingPozitionIds function returns an ordered array of the pozitions from a given starting point', () => {
  const expectedArray = [
    Seventh, Second, Ninth, Fourth, Eleventh, Sixth, First, Eighth, Third, Tenth, Fifth, Twelfth
  ]
  const actualArray = getAscendingPozitionIds(Seventh)

  expect(actualArray).toEqual(expectedArray)
})

test('getPozitionRootOffset returns 0 for first pozition id', () => {
  expect(getPozitionRootOffset(PozitionIds.First)).toBe(0)
})

test('getPozitionRootOffset returns 9 for fourth pozition id', () => {
  expect(getPozitionRootOffset(PozitionIds.Fourth)).toBe(9)
})

test('getPozitionRootOffset returns 5 for twelfth pozition id', () => {
  expect(getPozitionRootOffset(PozitionIds.Twelfth)).toBe(5)
})

test('getPozition function can return a first pozition', () => {
  const actualPozition = getPozition(first.id)

  expect(actualPozition).toStrictEqual(first)
})
