import { getPitch, PitchIds, getDegree, DegreeIds } from 'harpparts'

import { doSparceIdedObjectMatricesMatch } from './do-sparce-ided-object-matrices-match'

test('single item matched matrix returns true', () => {
  const matrix1 = [[getDegree(DegreeIds.Fifth)]]
  const matrix2 = [[getDegree(DegreeIds.Fifth)]]

  expect(doSparceIdedObjectMatricesMatch(matrix1, matrix2)).toBeTruthy()
  expect(doSparceIdedObjectMatricesMatch(matrix2, matrix1)).toBeTruthy()
})

test('mixed matching matrices return true', () => {
  const pitchMatrix1 = [
    [getPitch(PitchIds.A), getPitch(PitchIds.B), getPitch(PitchIds.C)],
    [getPitch(PitchIds.D), undefined, getPitch(PitchIds.E)],
    [getPitch(PitchIds.F), getPitch(PitchIds.G), undefined],
  ]
  const pitchMatrix2 = [
    [getPitch(PitchIds.A), getPitch(PitchIds.B), getPitch(PitchIds.C)],
    [getPitch(PitchIds.D), undefined, getPitch(PitchIds.E)],
    [getPitch(PitchIds.F), getPitch(PitchIds.G), undefined],
  ]

  expect(
    doSparceIdedObjectMatricesMatch(pitchMatrix1, pitchMatrix2)
  ).toBeTruthy()
  expect(
    doSparceIdedObjectMatricesMatch(pitchMatrix2, pitchMatrix1)
  ).toBeTruthy()
})

test('single item mismatched matrix returns false', () => {
  const matrix1 = [[getDegree(DegreeIds.Second)]]
  const matrix2 = [[getDegree(DegreeIds.Third)]]

  expect(doSparceIdedObjectMatricesMatch(matrix1, matrix2)).toBeFalsy()
  expect(doSparceIdedObjectMatricesMatch(matrix2, matrix1)).toBeFalsy()
})

test('mixed unmatched matrices return false', () => {
  const pitchMatrix1 = [
    [getPitch(PitchIds.A), getPitch(PitchIds.B), getPitch(PitchIds.C)],
    [getPitch(PitchIds.D), undefined, getPitch(PitchIds.E)],
    [getPitch(PitchIds.F), getPitch(PitchIds.G), undefined],
  ]
  const pitchMatrix2 = [
    [getPitch(PitchIds.C), getPitch(PitchIds.B), getPitch(PitchIds.C)],
    [getPitch(PitchIds.D), undefined, getPitch(PitchIds.E)],
    [getPitch(PitchIds.F), getPitch(PitchIds.G), undefined],
  ]
  const pitchMatrix3 = [
    [undefined, getPitch(PitchIds.B), getPitch(PitchIds.C)],
    [getPitch(PitchIds.D), undefined, getPitch(PitchIds.E)],
    [getPitch(PitchIds.F), getPitch(PitchIds.G), undefined],
  ]

  expect(
    doSparceIdedObjectMatricesMatch(pitchMatrix1, pitchMatrix2)
  ).toBeFalsy()
  expect(
    doSparceIdedObjectMatricesMatch(pitchMatrix2, pitchMatrix1)
  ).toBeFalsy()
  expect(
    doSparceIdedObjectMatricesMatch(pitchMatrix1, pitchMatrix2)
  ).toBeFalsy()
  expect(
    doSparceIdedObjectMatricesMatch(pitchMatrix3, pitchMatrix1)
  ).toBeFalsy()
  expect(
    doSparceIdedObjectMatricesMatch(pitchMatrix2, pitchMatrix3)
  ).toBeFalsy()
  expect(
    doSparceIdedObjectMatricesMatch(pitchMatrix3, pitchMatrix2)
  ).toBeFalsy()
})

test('matrices of unmatched length return false', () => {
  const pitchMatrix = [
    [getPitch(PitchIds.A), getPitch(PitchIds.A), getPitch(PitchIds.A)],
    [getPitch(PitchIds.A), getPitch(PitchIds.A), getPitch(PitchIds.A)],
    [getPitch(PitchIds.A), getPitch(PitchIds.A), getPitch(PitchIds.A)],
  ]
  const pitchMatrixExtraRow = [
    [getPitch(PitchIds.A), getPitch(PitchIds.A), getPitch(PitchIds.A)],
    [getPitch(PitchIds.A), getPitch(PitchIds.A), getPitch(PitchIds.A)],
    [getPitch(PitchIds.A), getPitch(PitchIds.A), getPitch(PitchIds.A)],
    [undefined, undefined, undefined],
  ]
  const pitchMatrixExtraColumn = [
    [
      getPitch(PitchIds.A),
      getPitch(PitchIds.A),
      getPitch(PitchIds.A),
      undefined,
    ],
    [
      getPitch(PitchIds.A),
      getPitch(PitchIds.A),
      getPitch(PitchIds.A),
      undefined,
    ],
    [
      getPitch(PitchIds.A),
      getPitch(PitchIds.A),
      getPitch(PitchIds.A),
      undefined,
    ],
  ]

  expect(
    doSparceIdedObjectMatricesMatch(pitchMatrix, pitchMatrixExtraRow)
  ).toBeFalsy()
  expect(
    doSparceIdedObjectMatricesMatch(pitchMatrixExtraRow, pitchMatrix)
  ).toBeFalsy()
  expect(
    doSparceIdedObjectMatricesMatch(pitchMatrix, pitchMatrixExtraColumn)
  ).toBeFalsy()
  expect(
    doSparceIdedObjectMatricesMatch(pitchMatrixExtraColumn, pitchMatrix)
  ).toBeFalsy()
})
