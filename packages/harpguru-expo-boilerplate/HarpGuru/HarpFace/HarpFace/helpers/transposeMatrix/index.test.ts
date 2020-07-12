import { transposeMatrix } from './index'

test('transposes a sinlge row to a column and back again', () => {
  const singleRow = [[1, 2, 3, 4, 5, 6]]
  const expectedTransposition = [[1], [2], [3], [4], [5], [6]]
  const actualTransposition = transposeMatrix(singleRow)

  expect(actualTransposition).toStrictEqual(expectedTransposition)
  expect(transposeMatrix(actualTransposition)).toStrictEqual(singleRow)
})

test('transposes a two row matrix to a two column matrix and back again', () => {
  const doubleRow = [
    [1, 2, 3, 4, 5, 6],
    [9, 8, 7, 6, 5, 4],
  ]
  const expectedTransposition = [
    [1, 9],
    [2, 8],
    [3, 7],
    [4, 6],
    [5, 5],
    [6, 4],
  ]
  const actualTransposition = transposeMatrix(doubleRow)

  expect(actualTransposition).toStrictEqual(expectedTransposition)
  expect(transposeMatrix(actualTransposition)).toStrictEqual(doubleRow)
})

test('transposes well in the presence of undefined', () => {
  const doubleRow = [
    [1, 2, 3, 4, 5, 6],
    [9, 8, 7, 6, undefined, undefined],
  ]
  const expectedTransposition = [
    [1, 9],
    [2, 8],
    [3, 7],
    [4, 6],
    [5, undefined],
    [6, undefined],
  ]
  const actualTransposition = transposeMatrix(doubleRow)

  expect(actualTransposition).toStrictEqual(expectedTransposition)
  expect(transposeMatrix(actualTransposition)).toStrictEqual(doubleRow)
})

test('transposes well with mixed types', () => {
  const doubleRow = [
    [1, '2', 3, 4, 5, 6],
    [9, 8, '7', 6, undefined, undefined],
  ]
  const expectedTransposition = [
    [1, 9],
    ['2', 8],
    [3, '7'],
    [4, 6],
    [5, undefined],
    [6, undefined],
  ]
  const actualTransposition = transposeMatrix(doubleRow)

  expect(actualTransposition).toStrictEqual(expectedTransposition)
  expect(transposeMatrix(actualTransposition)).toStrictEqual(doubleRow)
})

test('throws an error if the matrix rows are not all the same length, reporting the input matrix', () => {
  const unevenRows = [
    [1, 2, 3],
    [1, 2],
  ]

  expect(() => transposeMatrix(unevenRows)).toThrow('[[1,2,3],[1,2]]')
})

test('transposes an empty array without error', () => {
  const empty = [[]]

  expect(transposeMatrix(empty)).toStrictEqual(empty)
})
