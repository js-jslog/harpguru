import { getDegree, DegreeIds } from 'harpparts'

import { trimFullMatrixByColumnBounds } from './trim-fullmatrix-by-columnbounds'

const root = getDegree(DegreeIds.Root)
const second = getDegree(DegreeIds.Second)
const third = getDegree(DegreeIds.Third)
const fourth = getDegree(DegreeIds.Fourth)
const fifth = getDegree(DegreeIds.Fifth)

test('strict equivalent matrix is returned for actual FIT columnbounds', () => {
  const actualFitColumnBounds = 'FIT'
  const matrix = [
    [root, second, third, fourth, fifth],
    [root, second, third, fourth, fifth],
    [root, second, third, fourth, fifth],
  ]
  expect(trimFullMatrixByColumnBounds(matrix, actualFitColumnBounds)).toBe(
    matrix
  )
})

test('strict equivalent matrix is returned for effective FIT columnbounds', () => {
  const effectiveFitColumnBounds = [0, 4] as const
  const matrix = [
    [root, second, third, fourth, fifth],
    [root, second, third, fourth, fifth],
    [root, second, third, fourth, fifth],
  ]
  expect(
    trimFullMatrixByColumnBounds(matrix, effectiveFitColumnBounds)
  ).toStrictEqual(matrix)
})

test('trimmed matrix is returned for a not FIT columnbounds', () => {
  const notFitColumnBounds = [1, 2] as const
  const matrix = [
    [root, second, third, fourth, fifth],
    [root, second, third, fourth, fifth],
    [root, second, third, fourth, fifth],
  ]
  const expectedOutput = [
    [second, third],
    [second, third],
    [second, third],
  ]
  expect(
    trimFullMatrixByColumnBounds(matrix, notFitColumnBounds)
  ).toStrictEqual(expectedOutput)
})

test('trimmed matrix includes unused rows', () => {
  const notFitColumnBounds = [1, 2] as const
  const matrix = [
    [root, undefined, undefined, fourth, fifth],
    [root, second, third, fourth, fifth],
    [undefined, undefined, undefined, undefined, undefined],
  ]
  const expectedOutput = [
    [undefined, undefined],
    [second, third],
    [undefined, undefined],
  ]
  expect(
    trimFullMatrixByColumnBounds(matrix, notFitColumnBounds)
  ).toStrictEqual(expectedOutput)
})
