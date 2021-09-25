import { getPitch, PitchIds } from 'harpparts'

import { doSparceIdedObjectMatricesMatch } from './do-sparce-ided-object-matrices-match'

test('single item mismatched matrix returns false', () => {
  const pitchMatrix1 = [[getPitch(PitchIds.Ab)]]
  const pitchMatrix2 = [[getPitch(PitchIds.A)]]

  expect(
    doSparceIdedObjectMatricesMatch(pitchMatrix1, pitchMatrix2)
  ).toBeFalsy()
})

test('single item matched matrix returns true', () => {
  const pitchMatrix1 = [[getPitch(PitchIds.A)]]
  const pitchMatrix2 = [[getPitch(PitchIds.A)]]

  expect(
    doSparceIdedObjectMatricesMatch(pitchMatrix1, pitchMatrix2)
  ).toBeTruthy()
})
