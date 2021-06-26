import { getHarpStrata } from 'harpstrata'
import { TuningIds, PitchIds, PozitionIds, ValvingIds } from 'harpparts'

import type { GlobalState } from '../../../../types'

import { getNewHarpStrataByTuningForDispatcher } from './get-new-harpstrata-by-tuning-for-dispatcher'

const baseHarpStrataProps = {
  tuningId: TuningIds.MajorDiatonic,
  valvingId: ValvingIds.NotValved,
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

test('provides HarpStrata updated by tuning set to natural minor', () => {
  const inputGlobal = {
    activeHarpStrata: countryTunedHarp,
  } as GlobalState
  const unusedDispatcher = jest.fn()

  const {
    activeHarpStrata: newActiveHarpStrata,
  } = getNewHarpStrataByTuningForDispatcher(
    inputGlobal,
    unusedDispatcher,
    TuningIds.NaturalMinor
  )

  expect(newActiveHarpStrata).toStrictEqual(naturalMinorHarp)
})

test('provides HarpStrata updated by tuning to major diatonic', () => {
  const inputGlobal = {
    activeHarpStrata: countryTunedHarp,
  } as GlobalState
  const unusedDispatcher = jest.fn()

  const {
    activeHarpStrata: newActiveHarpStrata,
  } = getNewHarpStrataByTuningForDispatcher(
    inputGlobal,
    unusedDispatcher,
    TuningIds.MajorDiatonic
  )

  expect(newActiveHarpStrata).toStrictEqual(majorDiatonicHarp)
})
