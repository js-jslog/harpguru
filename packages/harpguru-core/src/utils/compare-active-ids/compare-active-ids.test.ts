import type { ActiveIds } from 'harpstrata'
import { PitchIds, DegreeIds } from 'harpparts'

import { compareActiveIds } from './compare-active-ids'

test('two identical arrays match', () => {
  const emptyIds = [] as ActiveIds
  const pitchIds = [PitchIds.A, PitchIds.B]
  const degreeIds = [DegreeIds.Root, DegreeIds.Second]
  expect(compareActiveIds(emptyIds, emptyIds)).toBeTruthy()
  expect(compareActiveIds(pitchIds, pitchIds)).toBeTruthy()
  expect(compareActiveIds(degreeIds, degreeIds)).toBeTruthy()
})
