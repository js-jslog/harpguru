import { PozitionIds } from './types'
import type { Pozition } from './types'
import { getActivePozitionIds, getPozition } from './index'

test('getActivePozitionIds function returns an array of the available pozitions', () => {
  const expectedIncludes = [ PozitionIds.First, PozitionIds.Second ]
  const actualArray = getActivePozitionIds()

  expect(actualArray).toEqual(expect.arrayContaining(expectedIncludes))
})

test('getPozition function can return a first pozition', () => {
  const FIRST_POZITION: Pozition = {
    id: PozitionIds.First,
    root: 0,
  } as const
  const actualPozition = getPozition(FIRST_POZITION.id)

  expect(actualPozition).toStrictEqual(FIRST_POZITION)
})
