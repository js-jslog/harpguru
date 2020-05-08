import { EXAMPLE_STRATA } from './testResources'

import { ApparatusIds, PozitionIds, PitchIds } from './types'
import { getApparatusIds, getPozitionIds, getHarpStrata, getPitchIds } from './index'

test('getApparatusIds function returns an array with a major diatonic as one of the values', () => {
  expect(getApparatusIds().includes(ApparatusIds.MajorDiatonic)).toBeTruthy()
})

test('getPozitionIds function returns an array with a first pozition as one of the values', () => {
  expect(getPozitionIds().includes(PozitionIds.First)).toBeTruthy()
})

test('getPitchIds function returns an array with a C as one of the values', () => {
  expect(getPitchIds().includes(PitchIds.C)).toBeTruthy()
})

test('getHarpStrata can return a first pozition C major diatonic HarpStrata with C major pentatonic IsActiveComplex given either set of ActiveIds', () => {
  const { C_MAJOR_DIATONIC_FIRST_POZITION_C_MAJOR_PENTATONIC: expectedStrata } = EXAMPLE_STRATA
  const { isActiveComplex: { activeDegreeIds,  activePitchIds }} = expectedStrata

  const harpStrataPropsBase = {
    apparatusId: ApparatusIds.MajorDiatonic,
    pozitionId: PozitionIds.First,
    keyPitchId: PitchIds.C,
    activeIds: []
  }
  const harpStrataPropsWithActiveDegreeIds = { ...harpStrataPropsBase, activeIds: activeDegreeIds }
  const harpStrataPropsWithActivePitchIds = { ...harpStrataPropsBase, activeIds: activePitchIds }

  const strataFromDegreeIds = getHarpStrata(harpStrataPropsWithActiveDegreeIds)
  const strataFromPitchIds = getHarpStrata(harpStrataPropsWithActivePitchIds)

  expect(strataFromDegreeIds).toEqual(expectedStrata)
  expect(strataFromPitchIds).toEqual(expectedStrata)
})

test('getHarpStrata can return a second pozition C major diatonic HarpStrata with G major pentatonic IsActiveComplex given either set of ActiveIds', () => {
  const { C_MAJOR_DIATONIC_SECOND_POZITION_G_MAJOR_PENTATONIC: expectedStrata } = EXAMPLE_STRATA
  const { isActiveComplex: { activeDegreeIds,  activePitchIds }} = expectedStrata

  const harpStrataPropsBase = {
    apparatusId: ApparatusIds.MajorDiatonic,
    pozitionId: PozitionIds.Second,
    keyPitchId: PitchIds.C,
    activeIds: []
  }
  const harpStrataPropsWithActiveDegreeIds = { ...harpStrataPropsBase, activeIds: activeDegreeIds }
  const harpStrataPropsWithActivePitchIds = { ...harpStrataPropsBase, activeIds: activePitchIds }

  const strataFromDegreeIds = getHarpStrata(harpStrataPropsWithActiveDegreeIds)
  const strataFromPitchIds = getHarpStrata(harpStrataPropsWithActivePitchIds)

  expect(strataFromDegreeIds).toEqual(expectedStrata)
  expect(strataFromPitchIds).toEqual(expectedStrata)
})
