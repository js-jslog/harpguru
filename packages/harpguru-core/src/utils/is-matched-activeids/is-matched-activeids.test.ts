import type { ActiveIds } from 'harpstrata'
import { PitchIds, DegreeIds } from 'harpparts'

import { isMatchedActiveIds } from './is-matched-activeids'

test('two identical arrays match', () => {
  const emptyIds = [] as ActiveIds
  const pitchIds = [PitchIds.A, PitchIds.B]
  const degreeIds = [DegreeIds.Root, DegreeIds.Second]
  expect(isMatchedActiveIds(emptyIds, emptyIds)).toBeTruthy()
  expect(isMatchedActiveIds(pitchIds, pitchIds)).toBeTruthy()
  expect(isMatchedActiveIds(degreeIds, degreeIds)).toBeTruthy()
})

test('two similar arrays match', () => {
  const emptyIds1 = [] as ActiveIds
  const emptyIds2 = [] as ActiveIds
  const pitchIds1 = [PitchIds.A, PitchIds.B]
  const pitchIds2 = [PitchIds.A, PitchIds.B]
  const degreeIds1 = [DegreeIds.Root, DegreeIds.Second]
  const degreeIds2 = [DegreeIds.Root, DegreeIds.Second]
  expect(isMatchedActiveIds(emptyIds1, emptyIds2)).toBeTruthy()
  expect(isMatchedActiveIds(pitchIds1, pitchIds2)).toBeTruthy()
  expect(isMatchedActiveIds(degreeIds1, degreeIds2)).toBeTruthy()
  expect(isMatchedActiveIds(emptyIds2, emptyIds1)).toBeTruthy()
  expect(isMatchedActiveIds(pitchIds2, pitchIds1)).toBeTruthy()
  expect(isMatchedActiveIds(degreeIds2, degreeIds1)).toBeTruthy()
})

test('two dissimilar arrays do not match', () => {
  const emptyIds1 = [] as ActiveIds
  const pitchIds1 = [PitchIds.A, PitchIds.B]
  const pitchIds2 = [PitchIds.B, PitchIds.A]
  const degreeIds1 = [DegreeIds.Root, DegreeIds.Second]
  const degreeIds2 = [DegreeIds.Second, DegreeIds.Root]
  expect(isMatchedActiveIds(emptyIds1, pitchIds1)).toBeFalsy()
  expect(isMatchedActiveIds(pitchIds1, pitchIds2)).toBeFalsy()
  expect(isMatchedActiveIds(degreeIds1, degreeIds2)).toBeFalsy()
  expect(isMatchedActiveIds(pitchIds1, degreeIds2)).toBeFalsy()
})

test('two "almost similar but for additional items" arrays do not match', () => {
  const pitchIds1 = [PitchIds.A, PitchIds.B]
  const pitchIds2 = [PitchIds.A, PitchIds.B, PitchIds.A]
  const degreeIds1 = [DegreeIds.Root, DegreeIds.Second]
  const degreeIds2 = [DegreeIds.Root, DegreeIds.Root, DegreeIds.Second]
  expect(isMatchedActiveIds(pitchIds1, pitchIds2)).toBeFalsy()
  expect(isMatchedActiveIds(degreeIds1, degreeIds2)).toBeFalsy()
  expect(isMatchedActiveIds(pitchIds2, pitchIds1)).toBeFalsy()
  expect(isMatchedActiveIds(degreeIds2, degreeIds1)).toBeFalsy()
})
