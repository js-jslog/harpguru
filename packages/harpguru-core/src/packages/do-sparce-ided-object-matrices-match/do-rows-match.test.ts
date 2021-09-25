import { getPitch, PitchIds } from 'harpparts'

import { doRowsMatch } from './do-rows-match'

test('single item mismatched row returns false', () => {
  const pitchRow1 = [getPitch(PitchIds.Ab)]
  const pitchRow2 = [getPitch(PitchIds.A)]

  expect(doRowsMatch(pitchRow1, pitchRow2)).toBeFalsy()
})

test('single item matched row returns true', () => {
  const pitchRow = [getPitch(PitchIds.A)]

  expect(doRowsMatch(pitchRow, pitchRow)).toBeTruthy()
})

test('single item undefined matched row returns true', () => {
  const undefinedRow = [undefined]

  expect(doRowsMatch(undefinedRow, undefinedRow)).toBeTruthy()
})

test('single item undefined matched with a pitch row returns false', () => {
  const undefinedRow = [undefined]
  const pitchRow = [getPitch(PitchIds.A)]

  expect(doRowsMatch(undefinedRow, pitchRow)).toBeFalsy()
  expect(doRowsMatch(pitchRow, undefinedRow)).toBeFalsy()
})
