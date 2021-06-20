import { getHarpStrata } from 'harpstrata'
import { TuningIds, PitchIds, PozitionIds } from 'harpparts'

import type { GlobalState } from '../../../../types'

import { getNewHarpStrataByApparatusForDispatcher } from './get-new-harpstrata-by-apparatus-for-dispatcher'

const baseHarpStrataProps = {
  tuningId: TuningIds.MajorDiatonic,
  pozitionId: PozitionIds.First,
  harpKeyId: PitchIds.C,
  activeIds: [],
}
const majorDiatonicHarpProps = baseHarpStrataProps
const countryTunedHarpProps = {
  ...baseHarpStrataProps,
  tuningId: TuningIds.CountryTuned,
}
const naturalMinorHarpProps = {
  ...baseHarpStrataProps,
  tuningId: TuningIds.NaturalMinor,
}

const majorDiatonicHarp = getHarpStrata(majorDiatonicHarpProps)
const countryTunedHarp = getHarpStrata(countryTunedHarpProps)
const naturalMinorHarp = getHarpStrata(naturalMinorHarpProps)

test('provides HarpStrata updated apparatus set to natural minor', () => {
  const inputGlobal = {
    activeHarpStrata: countryTunedHarp,
  } as GlobalState
  const unusedDispatcher = jest.fn()

  const {
    activeHarpStrata: newActiveHarpStrata,
  } = getNewHarpStrataByApparatusForDispatcher(
    inputGlobal,
    unusedDispatcher,
    TuningIds.NaturalMinor
  )

  expect(newActiveHarpStrata).toStrictEqual(naturalMinorHarp)
})

test('provides HarpStrata updated by apparatus to major diatonic', () => {
  const inputGlobal = {
    activeHarpStrata: countryTunedHarp,
  } as GlobalState
  const unusedDispatcher = jest.fn()

  const {
    activeHarpStrata: newActiveHarpStrata,
  } = getNewHarpStrataByApparatusForDispatcher(
    inputGlobal,
    unusedDispatcher,
    TuningIds.MajorDiatonic
  )

  expect(newActiveHarpStrata).toStrictEqual(majorDiatonicHarp)
})
