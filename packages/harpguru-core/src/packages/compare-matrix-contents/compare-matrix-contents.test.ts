import { getPitch, PitchIds } from 'harpparts'

import { compareMatrixContents } from './compare-matrix-contents'

test('single item mismatched matrix returns false', () => {
  const pitchMatrix1 = [[getPitch(PitchIds.Ab)]]
  const pitchMatrix2 = [[getPitch(PitchIds.A)]]

  expect(compareMatrixContents(pitchMatrix1, pitchMatrix2)).toBeFalsy()
})
