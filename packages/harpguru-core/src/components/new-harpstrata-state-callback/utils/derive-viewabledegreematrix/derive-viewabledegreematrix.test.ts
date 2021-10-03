import { getDegree, DegreeIds } from 'harpparts'

import { deriveViewableDegreeMatrix } from './derive-viewabledegreematrix'

const root = getDegree(DegreeIds.Root)
const second = getDegree(DegreeIds.Second)
const third = getDegree(DegreeIds.Third)
const fourth = getDegree(DegreeIds.Fourth)
const fifth = getDegree(DegreeIds.Fifth)

test('identical matrix is returned when columnBounds is FIT', () => {
  const columnBounds = 'FIT'
  const fullMatrix1 = [
    [root, second, third, fourth, fifth],
    [root, second, third, fourth, fifth],
    [root, second, third, fourth, fifth],
  ]
  const fullMatrix2 = [
    [root, second, third, fourth, undefined],
    [root, second, third, fourth, fifth],
    [root, undefined, third, fourth, fifth],
  ]
  const fullMatrix3 = [
    [getDegree(DegreeIds.Root), undefined],
    [getDegree(DegreeIds.Root), getDegree(DegreeIds.Third)],
    [undefined, getDegree(DegreeIds.Third)],
  ]

  expect(deriveViewableDegreeMatrix(fullMatrix1, columnBounds)).toBe(
    fullMatrix1
  )
  expect(deriveViewableDegreeMatrix(fullMatrix2, columnBounds)).toBe(
    fullMatrix2
  )
  expect(deriveViewableDegreeMatrix(fullMatrix3, columnBounds)).toBe(
    fullMatrix3
  )
})

test('sliced matrix is returned when columnBounds is [1, 2]', () => {
  const columnBounds = [0, 1] as const
  const fullMatrix1 = [
    [root, second, third, fourth, fifth],
    [root, second, third, fourth, fifth],
    [root, second, third, fourth, fifth],
  ]
  const slicedMatrix1 = [
    [root, second],
    [root, second],
    [root, second],
  ]
  const fullMatrix2 = [
    [root, second, third, fourth, undefined],
    [root, second, third, fourth, fifth],
    [root, undefined, third, fourth, fifth],
  ]
  const slicedMatrix2 = [
    [root, second],
    [root, second],
    [root, undefined],
  ]
  const fullMatrix3 = [
    [root, undefined],
    [root, third],
    [undefined, third],
  ]

  expect(deriveViewableDegreeMatrix(fullMatrix1, columnBounds)).toStrictEqual(
    slicedMatrix1
  )
  expect(deriveViewableDegreeMatrix(fullMatrix2, columnBounds)).toStrictEqual(
    slicedMatrix2
  )
  expect(deriveViewableDegreeMatrix(fullMatrix3, columnBounds)).toStrictEqual(
    fullMatrix3
  )
})
