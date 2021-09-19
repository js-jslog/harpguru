import { determineBest7Holes } from './determine-best-7-holes'

test('best 7 holes is the same as input if end bound is less than harp length', () => {
  const harpLength = 10
  const inputColumnBounds = [0, 6] as const
  expect(determineBest7Holes(harpLength, inputColumnBounds)).toBe(
    inputColumnBounds
  )
})
