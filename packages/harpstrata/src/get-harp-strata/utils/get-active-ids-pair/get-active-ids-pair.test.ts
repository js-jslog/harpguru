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
