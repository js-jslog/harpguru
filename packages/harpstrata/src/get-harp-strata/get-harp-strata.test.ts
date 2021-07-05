import { TuningIds, PitchIds, PozitionIds, ValvingIds } from 'harpparts'

import { EXAMPLE_STRATA } from './testResources'

import { getHarpStrata } from './index'

test('getHarpStrata can return a first pozition C richter HarpStrata with C major pentatonic ActiveIdsPair given either set of ActiveIds', () => {
  const {
    richter: {
      cHarp: {
        firstPozition: {
          notValved: {
            cMajorPentatonic: { harpStrata: expectedStrata },
          },
        },
      },
    },
  } = EXAMPLE_STRATA
  const { activeDegreeIds, activePitchIds } = expectedStrata

  const harpStrataPropsBase = {
    tuningId: TuningIds.Richter,
    valvingId: ValvingIds.NotValved,
    pozitionId: PozitionIds.First,
    harpKeyId: PitchIds.C,
    activeIds: [],
  }
  const harpStrataPropsWithActiveDegreeIds = {
    ...harpStrataPropsBase,
    activeIds: activeDegreeIds,
  }
  const harpStrataPropsWithActivePitchIds = {
    ...harpStrataPropsBase,
    activeIds: activePitchIds,
  }

  const strataFromDegreeIds = getHarpStrata(harpStrataPropsWithActiveDegreeIds)
  const strataFromPitchIds = getHarpStrata(harpStrataPropsWithActivePitchIds)

  expect(strataFromDegreeIds).toEqual(expectedStrata)
  expect(strataFromPitchIds).toEqual(expectedStrata)
})

test('getHarpStrata can return a first pozition C richter half valved HarpStrata with C major pentatonic ActiveIdsPair given either set of ActiveIds', () => {
  const {
    richter: {
      cHarp: {
        firstPozition: {
          halfValved: {
            cMajorPentatonic: { harpStrata: expectedStrata },
          },
        },
      },
    },
  } = EXAMPLE_STRATA
  const { activeDegreeIds, activePitchIds } = expectedStrata

  const harpStrataPropsBase = {
    tuningId: TuningIds.Richter,
    valvingId: ValvingIds.HalfValved,
    pozitionId: PozitionIds.First,
    harpKeyId: PitchIds.C,
    activeIds: [],
  }
  const harpStrataPropsWithActiveDegreeIds = {
    ...harpStrataPropsBase,
    activeIds: activeDegreeIds,
  }
  const harpStrataPropsWithActivePitchIds = {
    ...harpStrataPropsBase,
    activeIds: activePitchIds,
  }

  const strataFromDegreeIds = getHarpStrata(harpStrataPropsWithActiveDegreeIds)
  const strataFromPitchIds = getHarpStrata(harpStrataPropsWithActivePitchIds)

  expect(strataFromDegreeIds).toEqual(expectedStrata)
  expect(strataFromPitchIds).toEqual(expectedStrata)
})

test('getHarpStrata can return a second pozition C richter HarpStrata with G major pentatonic ActiveIdsPair given either set of ActiveIds', () => {
  const {
    richter: {
      cHarp: {
        secondPozition: {
          notValved: {
            gMajorPentatonic: { harpStrata: expectedStrata },
          },
        },
      },
    },
  } = EXAMPLE_STRATA
  const { activeDegreeIds, activePitchIds } = expectedStrata

  const harpStrataPropsBase = {
    tuningId: TuningIds.Richter,
    valvingId: ValvingIds.NotValved,
    pozitionId: PozitionIds.Second,
    harpKeyId: PitchIds.C,
    activeIds: [],
  }
  const harpStrataPropsWithActiveDegreeIds = {
    ...harpStrataPropsBase,
    activeIds: activeDegreeIds,
  }
  const harpStrataPropsWithActivePitchIds = {
    ...harpStrataPropsBase,
    activeIds: activePitchIds,
  }

  const strataFromDegreeIds = getHarpStrata(harpStrataPropsWithActiveDegreeIds)
  const strataFromPitchIds = getHarpStrata(harpStrataPropsWithActivePitchIds)

  expect(strataFromDegreeIds).toEqual(expectedStrata)
  expect(strataFromPitchIds).toEqual(expectedStrata)
})
