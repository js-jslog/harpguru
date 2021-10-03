import { getPitch, PitchIds } from 'harpparts'

import { deriveViewablePitchMatrix } from './derive-viewablepitchmatrix'

const c = getPitch(PitchIds.C)
const d = getPitch(PitchIds.D)
const e = getPitch(PitchIds.E)
const f = getPitch(PitchIds.F)
const g = getPitch(PitchIds.G)

test('identical matrix is returned when columnBounds is FIT', () => {
  const columnBounds = 'FIT'
  const fullMatrix1 = [
    [c, d, e, f, g],
    [c, d, e, f, g],
    [c, d, e, f, g],
  ]
  const fullMatrix2 = [
    [c, d, e, f, undefined],
    [c, d, e, f, g],
    [c, undefined, e, f, g],
  ]
  const fullMatrix3 = [
    [getPitch(PitchIds.C), undefined],
    [getPitch(PitchIds.C), getPitch(PitchIds.E)],
    [undefined, getPitch(PitchIds.E)],
  ]

  expect(deriveViewablePitchMatrix(fullMatrix1, columnBounds)).toBe(fullMatrix1)
  expect(deriveViewablePitchMatrix(fullMatrix2, columnBounds)).toBe(fullMatrix2)
  expect(deriveViewablePitchMatrix(fullMatrix3, columnBounds)).toBe(fullMatrix3)
})

test('sliced matrix is returned when columnBounds is [1, 2]', () => {
  const columnBounds = [0, 1] as const
  const fullMatrix1 = [
    [c, d, e, f, g],
    [c, d, e, f, g],
    [c, d, e, f, g],
  ]
  const slicedMatrix1 = [
    [c, d],
    [c, d],
    [c, d],
  ]
  const fullMatrix2 = [
    [c, d, e, f, undefined],
    [c, d, e, f, g],
    [c, undefined, e, f, g],
  ]
  const slicedMatrix2 = [
    [c, d],
    [c, d],
    [c, undefined],
  ]
  const fullMatrix3 = [
    [c, undefined],
    [c, e],
    [undefined, e],
  ]

  expect(deriveViewablePitchMatrix(fullMatrix1, columnBounds)).toStrictEqual(
    slicedMatrix1
  )
  expect(deriveViewablePitchMatrix(fullMatrix2, columnBounds)).toStrictEqual(
    slicedMatrix2
  )
  expect(deriveViewablePitchMatrix(fullMatrix3, columnBounds)).toStrictEqual(
    fullMatrix3
  )
})
