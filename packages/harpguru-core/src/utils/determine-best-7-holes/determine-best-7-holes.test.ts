import { determineBest7Holes } from './determine-best-7-holes'

test('best 7 holes is the same as input if end bound is less than harp length', () => {
  const harpLength = 10
  const inputColumnBounds = [0, 6] as const
  expect(determineBest7Holes(harpLength, inputColumnBounds)).toBe(
    inputColumnBounds
  )
})

test('best 7 holes is shifted down one when the end bound is past the harp length', () => {
  const harpLength = 10
  const inputColumnBounds = [4, 10] as const
  const expectedColumnBounds = [3, 9] as const
  expect(determineBest7Holes(harpLength, inputColumnBounds)).toStrictEqual(
    expectedColumnBounds
  )
})
