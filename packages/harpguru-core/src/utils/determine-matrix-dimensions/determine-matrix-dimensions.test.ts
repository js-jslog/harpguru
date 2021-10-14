import { determineMatrixDimensions } from './determine-matrix-dimensions'

test('a matrix with more columns than rows has its dimensions accurately determined', () => {
  const matrix = [
    [0, 0, 0, 0],
    [0, 0, 0, 0],
  ]
  expect(determineMatrixDimensions(matrix).columns).toBe(4)
  expect(determineMatrixDimensions(matrix).rows).toBe(2)
})

test('a matrix with more rows than columns has its dimensions accurately determined', () => {
  const matrix = [
    [0, 0, 0],
    [0, 0, 0],
    [0, 0, 0],
    [0, 0, 0],
    [0, 0, 0],
  ]
  expect(determineMatrixDimensions(matrix).columns).toBe(3)
  expect(determineMatrixDimensions(matrix).rows).toBe(5)
})
