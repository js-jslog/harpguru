import { getDegree, DegreeIds, getPitch, PitchIds } from 'harpparts'

import { getViewableMatrix } from './get-viewable-matrix'

test('full matrix is returned when columnBounds is FIT', () => {
  const columnBounds = 'FIT'
  const fullMatrix1 = [
    [1, 2, 3, 4, 5],
    [1, 2, 3, 4, 5],
    [1, 2, 3, 4, 5],
  ]
  const fullMatrix2 = [
    [1, 2, 3, 4, undefined],
    [1, 2, 3, 4, 5],
    [1, undefined, 3, 4, 5],
  ]
  const fullMatrix3 = [
    [getDegree(DegreeIds.Root), undefined],
    [getDegree(DegreeIds.Root), getDegree(DegreeIds.Third)],
    [undefined, getDegree(DegreeIds.Third)],
  ]
  const fullMatrix4 = [
    [getPitch(PitchIds.A), undefined],
    [getPitch(PitchIds.B), getPitch(PitchIds.A)],
    [undefined, getPitch(PitchIds.B)],
  ]

  expect(getViewableMatrix(fullMatrix1, columnBounds)).toBe(fullMatrix1)
  expect(getViewableMatrix(fullMatrix2, columnBounds)).toBe(fullMatrix2)
  expect(getViewableMatrix(fullMatrix3, columnBounds)).toBe(fullMatrix3)
  expect(getViewableMatrix(fullMatrix4, columnBounds)).toBe(fullMatrix4)
})

test('sliced matrix is returned when columnBounds is [1, 2]', () => {
  const columnBounds = [0, 1] as const
  const fullMatrix1 = [
    [1, 2, 3, 4, 5],
    [1, 2, 3, 4, 5],
    [1, 2, 3, 4, 5],
  ]
  const slicedMatrix1 = [
    [1, 2],
    [1, 2],
    [1, 2],
  ]
  const fullMatrix2 = [
    [1, 2, 3, 4, undefined],
    [1, 2, 3, 4, 5],
    [1, undefined, 3, 4, 5],
  ]
  const slicedMatrix2 = [
    [1, 2],
    [1, 2],
    [1, undefined],
  ]
  const fullMatrix3 = [
    [getDegree(DegreeIds.Root), undefined],
    [getDegree(DegreeIds.Root), getDegree(DegreeIds.Third)],
    [undefined, getDegree(DegreeIds.Third)],
  ]
  const fullMatrix4 = [
    [getPitch(PitchIds.A), undefined],
    [getPitch(PitchIds.B), getPitch(PitchIds.A)],
    [undefined, getPitch(PitchIds.B)],
  ]

  expect(getViewableMatrix(fullMatrix1, columnBounds)).toStrictEqual(
    slicedMatrix1
  )
  expect(getViewableMatrix(fullMatrix2, columnBounds)).toStrictEqual(
    slicedMatrix2
  )
  expect(getViewableMatrix(fullMatrix3, columnBounds)).toStrictEqual(
    fullMatrix3
  )
  expect(getViewableMatrix(fullMatrix4, columnBounds)).toStrictEqual(
    fullMatrix4
  )
})
