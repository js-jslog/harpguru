import { PitchIds, DegreeIds } from 'harpparts'

import { isMatchActiveIds } from './ismatch-activeids'

test('two identical arrays match', () => {
  const emptyIds = [] as const
  const pitchIds = [PitchIds.A, PitchIds.B]
  const degreeIds = [DegreeIds.Root, DegreeIds.Second]
  expect(isMatchActiveIds(emptyIds, emptyIds)).toBeTruthy()
  expect(isMatchActiveIds(pitchIds, pitchIds)).toBeTruthy()
  expect(isMatchActiveIds(degreeIds, degreeIds)).toBeTruthy()
})

test('two similar arrays match', () => {
  const emptyIds1 = [] as const
  const emptyIds2 = [] as const
  const pitchIds1 = [PitchIds.A, PitchIds.B]
  const pitchIds2 = [PitchIds.A, PitchIds.B]
  const degreeIds1 = [DegreeIds.Root, DegreeIds.Second]
  const degreeIds2 = [DegreeIds.Root, DegreeIds.Second]
  expect(isMatchActiveIds(emptyIds1, emptyIds2)).toBeTruthy()
  expect(isMatchActiveIds(pitchIds1, pitchIds2)).toBeTruthy()
  expect(isMatchActiveIds(degreeIds1, degreeIds2)).toBeTruthy()
  expect(isMatchActiveIds(emptyIds2, emptyIds1)).toBeTruthy()
  expect(isMatchActiveIds(pitchIds2, pitchIds1)).toBeTruthy()
  expect(isMatchActiveIds(degreeIds2, degreeIds1)).toBeTruthy()
})

test('two dissimilar arrays do not match', () => {
  const emptyIds1 = [] as const
  const pitchIds1 = [PitchIds.A, PitchIds.B]
  const pitchIds2 = [PitchIds.B, PitchIds.A]
  const degreeIds1 = [DegreeIds.Root, DegreeIds.Second]
  const degreeIds2 = [DegreeIds.Second, DegreeIds.Root]
  expect(isMatchActiveIds(emptyIds1, pitchIds1)).toBeFalsy()
  expect(isMatchActiveIds(pitchIds1, pitchIds2)).toBeFalsy()
  expect(isMatchActiveIds(degreeIds1, degreeIds2)).toBeFalsy()
  expect(isMatchActiveIds(pitchIds1, degreeIds2)).toBeFalsy()
})

test('two "almost similar but for additional items" arrays do not match', () => {
  const pitchIds1 = [PitchIds.A, PitchIds.B]
  const pitchIds2 = [PitchIds.A, PitchIds.B, PitchIds.A]
  const degreeIds1 = [DegreeIds.Root, DegreeIds.Second]
  const degreeIds2 = [DegreeIds.Root, DegreeIds.Root, DegreeIds.Second]
  expect(isMatchActiveIds(pitchIds1, pitchIds2)).toBeFalsy()
  expect(isMatchActiveIds(degreeIds1, degreeIds2)).toBeFalsy()
  expect(isMatchActiveIds(pitchIds2, pitchIds1)).toBeFalsy()
  expect(isMatchActiveIds(degreeIds2, degreeIds1)).toBeFalsy()
})
