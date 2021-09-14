import { sliceMatrix } from './slice-matrix'

test('sliceMatrix returns an identical matrix when no other params are provided', () => {
  const matrix = [
    [0, 1, 2, 3, 4],
    [5, 6, 7, 8, 9],
  ]

  expect(sliceMatrix(matrix)).toBe(matrix)
})

test('sliceMatrix returns an empty matrix when end index is 0', () => {
  const inputMatrix = [
    [0, 1, 2, 3, 4],
    [5, 6, 7, 8, 9],
  ]
  const emptyMatrix = [[], []]

  expect(sliceMatrix(inputMatrix, undefined, 0)).toStrictEqual(emptyMatrix)
  expect(sliceMatrix(inputMatrix, 1, 0)).toStrictEqual(emptyMatrix)
})

test('sliceMatrix returns an empty matrix if the start index is greater than or equal to the second', () => {
  const inputMatrix = [
    [0, 1, 2, 3, 4],
    [5, 6, 7, 8, 9],
  ]
  const emptyMatrix = [[], []]

  expect(sliceMatrix(inputMatrix, 2, 1)).toStrictEqual(emptyMatrix)
  expect(sliceMatrix(inputMatrix, 1, -3)).toStrictEqual(emptyMatrix)
})
