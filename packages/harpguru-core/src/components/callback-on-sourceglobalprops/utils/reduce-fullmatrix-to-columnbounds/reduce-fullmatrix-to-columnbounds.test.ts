import { reduceFullMatrixToColumnBounds } from './reduce-fullmatrix-to-columnbounds'

const fullMatrix = [
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
]

test('the previous columnBounds object is returned if it is still appropriate for the full matrix', () => {
  const fitColumnBounds = 'FIT'
  const fullRangeColumnBounds = [0, 9] as const
  const partialRangeColumnBounds = [1, 7] as const
  expect(reduceFullMatrixToColumnBounds(fitColumnBounds, fullMatrix)).toBe(
    fitColumnBounds
  )
  expect(
    reduceFullMatrixToColumnBounds(fullRangeColumnBounds, fullMatrix)
  ).toBe(fullRangeColumnBounds)
  expect(
    reduceFullMatrixToColumnBounds(partialRangeColumnBounds, fullMatrix)
  ).toBe(partialRangeColumnBounds)
})

test('a new columnBounds is returned if the original needed to be slid down', () => {
  expect(reduceFullMatrixToColumnBounds([9, 18], fullMatrix)).toStrictEqual([
    0,
    9,
  ])
  expect(reduceFullMatrixToColumnBounds([9, 15], fullMatrix)).toStrictEqual([
    3,
    9,
  ])
  expect(reduceFullMatrixToColumnBounds([1, 12], fullMatrix)).toStrictEqual([
    0,
    11,
  ])
})
