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

test('getHarpStrata can return a first pozition C major diatonic HarpStrata', () => {
  const { C_MAJOR_DIATONIC_FIRST_POZITION: expectedStrata } = EXAMPLE_STRATA
  const actualStrata = getHarpStrata(ApparatusIds.MajorDiatonic, PozitionIds.First, PitchIds.C)

  expect(actualStrata).toStrictEqual(expectedStrata)
})

test('getHarpStrata can return a second pozition C major diatonic HarpStrata', () => {
  const { C_MAJOR_DIATONIC_SECOND_POZITION: expectedStrata } = EXAMPLE_STRATA
  const actualStrata = getHarpStrata(ApparatusIds.MajorDiatonic, PozitionIds.Second, PitchIds.C)

  expect(actualStrata).toStrictEqual(expectedStrata)
})
