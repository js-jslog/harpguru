import { getHarpStrata } from '../index'
import { PozitionIds } from '../../Pozition'
import { PitchIds } from '../../Pitch'
import { EXAMPLE_STRATA } from '../../HarpStrata'
import { ApparatusIds } from '../../Apparatus'

test('getHarpStrata can return a first pozition C major diatonic HarpStrata with C major pentatonic IsActiveComplex given either set of ActiveIds', () => {
  const {
    C_MAJOR_DIATONIC_FIRST_POZITION_C_MAJOR_PENTATONIC: expectedStrata,
  } = EXAMPLE_STRATA
  const {
    isActiveComplex: { activeDegreeIds, activePitchIds },
  } = expectedStrata

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

test('getHarpStrata can return a second pozition C major diatonic HarpStrata with G major pentatonic IsActiveComplex given either set of ActiveIds', () => {
  const {
    C_MAJOR_DIATONIC_SECOND_POZITION_G_MAJOR_PENTATONIC: expectedStrata,
  } = EXAMPLE_STRATA
  const {
    isActiveComplex: { activeDegreeIds, activePitchIds },
  } = expectedStrata

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
