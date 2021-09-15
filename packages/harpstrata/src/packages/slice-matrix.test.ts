import { sliceMatrix } from './slice-matrix'

test('sliceMatrix returns the input matrix', () => {
  const matrix = [
    [0, 1, 2, 3, 4],
    [5, 6, 7, 8, 9],
  ]

  expect(sliceMatrix(matrix)).toStrictEqual(matrix)
  expect(sliceMatrix(matrix, 0, 5)).toStrictEqual(matrix)
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

test('sliceMatrix returns a matrix of the same height', () => {
  const matrix1Row = [[0, 1, 2, 3, 4]]
  const matrix3Row = [
    [0, 1, 2, 3, 4],
    [0, 1, 2, 3, 4],
  ]
  const matrix3RowTruncated = [
    [1, 2, 3, 4],
    [1, 2, 3, 4],
  ]
  const matrix4Row = [
    [0, 1, 2, 3, 4],
    [0, 1, 2, 3, 4],
    [0, 1, 2, 3, 4],
    [0, 1, 2, 3, 4],
  ]
  const matrix4RowTruncated = [
    [0, 1, 2, 3],
    [0, 1, 2, 3],
    [0, 1, 2, 3],
    [0, 1, 2, 3],
  ]

  expect(sliceMatrix(matrix1Row)).toStrictEqual(matrix1Row)
  expect(sliceMatrix(matrix3Row, 1)).toStrictEqual(matrix3RowTruncated)
  expect(sliceMatrix(matrix4Row, 0, 4)).toStrictEqual(matrix4RowTruncated)
})
