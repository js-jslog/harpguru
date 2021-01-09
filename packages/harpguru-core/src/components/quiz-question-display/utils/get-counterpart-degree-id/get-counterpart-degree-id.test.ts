import { DegreeIds, PitchIds, PozitionIds } from 'harpparts'

import { getCounterpartDegreeId } from './get-counterpart-degree-id'

test('returns Root as the DegreeId counterpart to C on a C harp in 1st pozition', () => {
  const { C: pitchId } = PitchIds
  const { C: harpKeyId } = PitchIds
  const { First: pozitionId } = PozitionIds
  const props = {
    pitchId,
    harpKeyId,
    pozitionId,
  }

  expect(getCounterpartDegreeId(props)).toBe(DegreeIds.Root)
})

test('returns Third as the DegreeId counterpart to E on a C harp in 1st pozition', () => {
  const { E: pitchId } = PitchIds
  const { C: harpKeyId } = PitchIds
  const { First: pozitionId } = PozitionIds
  const props = {
    pitchId,
    harpKeyId,
    pozitionId,
  }

  expect(getCounterpartDegreeId(props)).toBe(DegreeIds.Third)
})

test('returns Flat7 as the DegreeId counterpart to F on a C harp in 2nd pozition', () => {
  const { F: pitchId } = PitchIds
  const { C: harpKeyId } = PitchIds
  const { Second: pozitionId } = PozitionIds
  const props = {
    pitchId,
    harpKeyId,
    pozitionId,
  }

  expect(getCounterpartDegreeId(props)).toBe(DegreeIds.Flat7)
})

test('returns Flat3 as the DegreeId counterpart to G on a Eb harp in 8th pozition', () => {
  const { G: pitchId } = PitchIds
  const { Eb: harpKeyId } = PitchIds
  const { Eighth: pozitionId } = PozitionIds
  const props = {
    pitchId,
    harpKeyId,
    pozitionId,
  }

  expect(getCounterpartDegreeId(props)).toBe(DegreeIds.Flat3)
})
