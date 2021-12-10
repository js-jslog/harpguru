import { DegreeIds, PitchIds } from 'harpparts'

import { getActiveIdsPair } from './index'

test('getActiveIdsPair returns the active ids for a given PitchIds[]', () => {
  const activePitchIds = [PitchIds.D, PitchIds.E] as const

  const expectedActiveIdsPair = {
    activeDegreeIds: [DegreeIds.Second, DegreeIds.Third] as const,
    activePitchIds: activePitchIds,
  }
  const actualActiveIds = getActiveIdsPair(PitchIds.C, activePitchIds)

  expect(actualActiveIds).toStrictEqual(expectedActiveIdsPair)
})

test('getActiveIdsPair returns the active ids for a given DegreeIds[]', () => {
  const activeDegreeIds = [DegreeIds.Second, DegreeIds.Third] as const
  const expectedActiveIds = {
    activePitchIds: [PitchIds.D, PitchIds.E] as const,
    activeDegreeIds: activeDegreeIds,
  }
  const actualActiveIds = getActiveIdsPair(PitchIds.C, activeDegreeIds)

  expect(actualActiveIds).toStrictEqual(expectedActiveIds)
})

test('getActiveIdsPair returns the active ids for a given PitchIds[] regardless of the activeIds order', () => {
  const activePitchIdsOrdered = [PitchIds.D, PitchIds.E, PitchIds.F] as const
  const activePitchIdsJumbled = [PitchIds.D, PitchIds.F, PitchIds.E] as const

  const expectedActiveIdsPair = {
    activeDegreeIds: [
      DegreeIds.Flat6,
      DegreeIds.Flat7,
      DegreeIds.Seventh,
    ] as const,
    activePitchIds: activePitchIdsOrdered,
  }
  expect(getActiveIdsPair(PitchIds.Gb, activePitchIdsOrdered)).toStrictEqual(
    expectedActiveIdsPair
  )
  expect(getActiveIdsPair(PitchIds.Gb, activePitchIdsJumbled)).toStrictEqual(
    expectedActiveIdsPair
  )
})

test('getActiveIdsPair returns the active ids for a given DegreeIds[] regardless of the activeIds order', () => {
  const activeDegreeIdsOrdered = [
    DegreeIds.Root,
    DegreeIds.Flat2,
    DegreeIds.Third,
    DegreeIds.Flat6,
    DegreeIds.Seventh,
  ] as const
  const activeDegreeIdsJumbled = [
    DegreeIds.Seventh,
    DegreeIds.Flat6,
    DegreeIds.Flat2,
    DegreeIds.Third,
    DegreeIds.Root,
  ] as const
  const expectedActiveIds = {
    activePitchIds: [
      PitchIds.E,
      PitchIds.F,
      PitchIds.Ab,
      PitchIds.C,
      PitchIds.Eb,
    ] as const,
    activeDegreeIds: activeDegreeIdsOrdered,
  }
  expect(getActiveIdsPair(PitchIds.E, activeDegreeIdsOrdered)).toStrictEqual(
    expectedActiveIds
  )
  expect(getActiveIdsPair(PitchIds.E, activeDegreeIdsJumbled)).toStrictEqual(
    expectedActiveIds
  )
})
