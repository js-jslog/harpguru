import { sliceMatrix } from './slice-matrix'

test('sliceMatrix returns an identical matrix when no other params are provided', () => {
  const matrix = [
    [0, 1, 2, 3, 4],
    [5, 6, 7, 8, 9],
  ]

  expect(sliceMatrix(matrix)).toStrictEqual(matrix)
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

test('sliceMatrix returns a matrix with the first column removed', () => {
  const inputMatrix = [
    [0, 1, 2, 3, 4],
    [5, 6, 7, 8, 9],
  ]

  const truncatedMatrix = [
    [1, 2, 3, 4],
    [6, 7, 8, 9],
  ]

  expect(sliceMatrix(inputMatrix, 1)).toStrictEqual(truncatedMatrix)
  expect(sliceMatrix(inputMatrix, 1, 10)).toStrictEqual(truncatedMatrix)
  expect(sliceMatrix(inputMatrix, 1, 5)).toStrictEqual(truncatedMatrix)
})

test('sliceMatrix returns a matrix with the last column removed', () => {
  const inputMatrix = [
    [0, 1, 2, 3, 4],
    [5, 6, 7, 8, 9],
  ]

  const truncatedMatrix = [
    [0, 1, 2, 3],
    [5, 6, 7, 8],
  ]

  expect(sliceMatrix(inputMatrix, undefined, 4)).toStrictEqual(truncatedMatrix)
  expect(sliceMatrix(inputMatrix, 0, 4)).toStrictEqual(truncatedMatrix)
  expect(sliceMatrix(inputMatrix, -10, 4)).toStrictEqual(truncatedMatrix)
  expect(sliceMatrix(inputMatrix, undefined, -1)).toStrictEqual(truncatedMatrix)
  expect(sliceMatrix(inputMatrix, 0, -1)).toStrictEqual(truncatedMatrix)
  expect(sliceMatrix(inputMatrix, -10, -1)).toStrictEqual(truncatedMatrix)
})

test('sliceMatrix returns a matrix with truncations at both ends', () => {
  const inputMatrix = [
    [0, 1, 2, 3, 4],
    [5, 6, 7, 8, 9],
  ]

  const truncatedMatrix = [
    [1, 2],
    [6, 7],
  ]

  expect(sliceMatrix(inputMatrix, 1, 3)).toStrictEqual(truncatedMatrix)
  expect(sliceMatrix(inputMatrix, 1, -2)).toStrictEqual(truncatedMatrix)
})
