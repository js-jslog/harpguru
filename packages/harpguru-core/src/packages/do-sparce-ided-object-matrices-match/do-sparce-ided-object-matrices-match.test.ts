import { getPitch, PitchIds } from 'harpparts'

import { doSparceIdedObjectMatricesMatch } from './do-sparce-ided-object-matrices-match'

test('single item matched matrix returns true', () => {
  const pitchMatrix1 = [[getPitch(PitchIds.A)]]
  const pitchMatrix2 = [[getPitch(PitchIds.A)]]

  expect(
    doSparceIdedObjectMatricesMatch(pitchMatrix1, pitchMatrix2)
  ).toBeTruthy()
  expect(
    doSparceIdedObjectMatricesMatch(pitchMatrix2, pitchMatrix1)
  ).toBeTruthy()
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
  const pitchMatrix1 = [[getPitch(PitchIds.Ab)]]
  const pitchMatrix2 = [[getPitch(PitchIds.A)]]

  expect(
    doSparceIdedObjectMatricesMatch(pitchMatrix1, pitchMatrix2)
  ).toBeFalsy()
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
