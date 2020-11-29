import { ApparatusIds, PitchIds, PozitionIds } from 'harpparts'

import { EXAMPLE_STRATA } from './testResources'

import { getHarpStrata } from './index'

test('getHarpStrata can return a first pozition C major diatonic HarpStrata with C major pentatonic ActiveIdsPair given either set of ActiveIds', () => {
  const {
    C_MAJOR_DIATONIC_FIRST_POZITION_C_MAJOR_PENTATONIC: expectedStrata,
  } = EXAMPLE_STRATA
  const { activeDegreeIds, activePitchIds } = expectedStrata

  const harpStrataPropsBase = {
    apparatusId: ApparatusIds.MajorDiatonic,
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

test('getHarpStrata can return a second pozition C major diatonic HarpStrata with G major pentatonic ActiveIdsPair given either set of ActiveIds', () => {
  const {
    C_MAJOR_DIATONIC_SECOND_POZITION_G_MAJOR_PENTATONIC: expectedStrata,
  } = EXAMPLE_STRATA
  const { activeDegreeIds, activePitchIds } = expectedStrata

  const harpStrataPropsBase = {
    apparatusId: ApparatusIds.MajorDiatonic,
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