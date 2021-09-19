import { determineBest7Holes } from './determine-best-7-holes'

test('best 7 holes is the same as input if end bound is less than or equal to harp length', () => {
  const harpLength = 10
  const inputColumnBoundsLessThan = [0, 6] as const
  expect(determineBest7Holes(harpLength, inputColumnBoundsLessThan)).toBe(
    inputColumnBoundsLessThan
  )
  const inputColumnBoundsOnLimit = [3, 9] as const
  expect(determineBest7Holes(harpLength, inputColumnBoundsOnLimit)).toBe(
    inputColumnBoundsOnLimit
  )
})

test('best 7 holes is shifted down when the end bound is past the harp length', () => {
  const harpLength = 10
  const expectedColumnBounds = [3, 9] as const

  const inputColumnBoundsByOne = [4, 10] as const
  expect(determineBest7Holes(harpLength, inputColumnBoundsByOne)).toStrictEqual(
    expectedColumnBounds
  )
  const inputColumnBoundsByMany = [40, 46] as const
  expect(
    determineBest7Holes(harpLength, inputColumnBoundsByMany)
  ).toStrictEqual(expectedColumnBounds)
})
