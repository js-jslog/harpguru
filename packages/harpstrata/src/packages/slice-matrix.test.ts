import { sliceMatrix } from './slice-matrix'

test('sliceMatrix returns an identical matrix when no other params are provided', () => {
  const matrix = [
    [0, 1, 2, 3, 4],
    [5, 6, 7, 8, 9],
  ]

  expect(sliceMatrix(matrix)).toBe(matrix)
})

test('sliceMatrix returns an empty matrix of the same height when end index is 0', () => {
  const inputMatrix2Rows = [
    [0, 1, 2, 3, 4],
    [5, 6, 7, 8, 9],
  ]
  const emptyMatrix2Rows = [[], []]

  expect(sliceMatrix(inputMatrix2Rows, undefined, 0)).toStrictEqual(
    emptyMatrix2Rows
  )
  expect(sliceMatrix(inputMatrix2Rows, 1, 0)).toStrictEqual(emptyMatrix2Rows)

  const inputMatrix3Rows = [
    [0, 1, 2, 3, 4],
    [5, 6, 7, 8, 9],
    [5, 6, 7, 8, 9],
  ]
  const emptyMatrix3Rows = [[], [], []]

  expect(sliceMatrix(inputMatrix3Rows, undefined, 0)).toStrictEqual(
    emptyMatrix3Rows
  )
  expect(sliceMatrix(inputMatrix3Rows, 1, 0)).toStrictEqual(emptyMatrix3Rows)
})

test('sliceMatrix returns an empty matrix of the same height if the start index is greater than or equal to the second', () => {
  const inputMatrix2Rows = [
    [0, 1, 2, 3, 4],
    [5, 6, 7, 8, 9],
  ]
  const emptyMatrix2Rows = [[], []]

  expect(sliceMatrix(inputMatrix2Rows, 2, 1)).toStrictEqual(emptyMatrix2Rows)
  expect(sliceMatrix(inputMatrix2Rows, 1, -3)).toStrictEqual(emptyMatrix2Rows)

  const inputMatrix3Rows = [
    [0, 1, 2, 3, 4],
    [5, 6, 7, 8, 9],
    [5, 6, 7, 8, 9],
  ]
  const emptyMatrix3Rows = [[], [], []]

  expect(sliceMatrix(inputMatrix3Rows, 2, 1)).toStrictEqual(emptyMatrix3Rows)
  expect(sliceMatrix(inputMatrix3Rows, 1, -3)).toStrictEqual(emptyMatrix3Rows)
})
