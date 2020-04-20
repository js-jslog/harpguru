import { EXAMPLE_STRATA } from './testResources'

import { ApparatusIds, PozitionIds } from './types'
import { getHarpIds, getPozitionIds, getHarpStrata} from './index'

test('getHarpIds function returns an array with a major diatonic as one of the values', () => {
  expect(getHarpIds().includes(ApparatusIds.MajorDiatonic)).toBeTruthy()
})

test('getPozitionIds function returns an array with a first pozition as one of the values', () => {
  expect(getPozitionIds().includes(PozitionIds.First)).toBeTruthy()
})

test('getHarpStrata can return a first pozition major diatonic HarpStrata', () => {
  const { MAJOR_DIATONIC_FIRST_POZITION: expectedStrata } = EXAMPLE_STRATA
  const actualStrata = getHarpStrata(ApparatusIds.MajorDiatonic, PozitionIds.First)

  expect(actualStrata).toStrictEqual(expectedStrata)
})

test('getHarpStrata can return a second pozition major diatonic HarpStrata', () => {
  const { MAJOR_DIATONIC_SECOND_POZITION: expectedStrata } = EXAMPLE_STRATA
  const actualStrata = getHarpStrata(ApparatusIds.MajorDiatonic, PozitionIds.Second)

  expect(actualStrata).toStrictEqual(expectedStrata)
})
