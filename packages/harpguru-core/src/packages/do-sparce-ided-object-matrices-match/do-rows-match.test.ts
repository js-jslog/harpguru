import { getPitch, PitchIds } from 'harpparts'

import { doRowsMatch } from './do-rows-match'

test('single item mismatched row returns false', () => {
  const pitchRow1 = [getPitch(PitchIds.Ab)]
  const pitchRow2 = [getPitch(PitchIds.A)]

  expect(doRowsMatch(pitchRow1, pitchRow2)).toBeFalsy()
})

test('fully populated matched rows returns true', () => {
  const pitchRow1 = [
    getPitch(PitchIds.A),
    getPitch(PitchIds.B),
    getPitch(PitchIds.C),
  ]
  const pitchRow2 = [
    getPitch(PitchIds.A),
    getPitch(PitchIds.B),
    getPitch(PitchIds.C),
  ]

  expect(doRowsMatch(pitchRow1, pitchRow1)).toBeTruthy()
  expect(doRowsMatch(pitchRow1, pitchRow2)).toBeTruthy()
  expect(doRowsMatch(pitchRow2, pitchRow1)).toBeTruthy()
})

test('fully undefined rows of same length returns true', () => {
  const undefinedRow1 = [undefined, undefined, undefined, undefined]
  const undefinedRow2 = [undefined, undefined, undefined, undefined]

  expect(doRowsMatch(undefinedRow1, undefinedRow1)).toBeTruthy()
  expect(doRowsMatch(undefinedRow1, undefinedRow2)).toBeTruthy()
  expect(doRowsMatch(undefinedRow2, undefinedRow1)).toBeTruthy()
})

test('mixed rows of same length returns true', () => {
  const row1 = [undefined, getPitch(PitchIds.A), undefined, undefined]
  const row2 = [undefined, getPitch(PitchIds.A), undefined, undefined]

  expect(doRowsMatch(row1, row1)).toBeTruthy()
  expect(doRowsMatch(row1, row2)).toBeTruthy()
  expect(doRowsMatch(row2, row1)).toBeTruthy()
})

test('fully populated rows with mismatched object returns false', () => {
  const pitchRow1 = [
    getPitch(PitchIds.A),
    getPitch(PitchIds.B),
    getPitch(PitchIds.C),
  ]
  const pitchRow2 = [
    getPitch(PitchIds.C),
    getPitch(PitchIds.B),
    getPitch(PitchIds.A),
  ]
  const pitchRow3 = [
    getPitch(PitchIds.C),
    getPitch(PitchIds.C),
    getPitch(PitchIds.C),
  ]

  expect(doRowsMatch(pitchRow1, pitchRow2)).toBeFalsy()
  expect(doRowsMatch(pitchRow2, pitchRow1)).toBeFalsy()
  expect(doRowsMatch(pitchRow1, pitchRow3)).toBeFalsy()
  expect(doRowsMatch(pitchRow3, pitchRow1)).toBeFalsy()
  expect(doRowsMatch(pitchRow2, pitchRow3)).toBeFalsy()
  expect(doRowsMatch(pitchRow3, pitchRow2)).toBeFalsy()
})

test('rows which match other than an undefined item return false', () => {
  const row1 = [
    getPitch(PitchIds.A),
    getPitch(PitchIds.B),
    getPitch(PitchIds.C),
  ]
  const row2 = [undefined, getPitch(PitchIds.B), getPitch(PitchIds.C)]
  const row3 = [getPitch(PitchIds.A), getPitch(PitchIds.B), undefined]

  expect(doRowsMatch(row1, row2)).toBeFalsy()
  expect(doRowsMatch(row2, row1)).toBeFalsy()
  expect(doRowsMatch(row1, row3)).toBeFalsy()
  expect(doRowsMatch(row3, row1)).toBeFalsy()
  expect(doRowsMatch(row2, row3)).toBeFalsy()
  expect(doRowsMatch(row3, row2)).toBeFalsy()
})

test('mixed rows of same length with same content in different order returns false', () => {
  const row1 = [undefined, undefined, getPitch(PitchIds.A), undefined]
  const row2 = [undefined, getPitch(PitchIds.A), undefined, undefined]

  expect(doRowsMatch(row1, row2)).toBeFalsy()
  expect(doRowsMatch(row2, row1)).toBeFalsy()
})
