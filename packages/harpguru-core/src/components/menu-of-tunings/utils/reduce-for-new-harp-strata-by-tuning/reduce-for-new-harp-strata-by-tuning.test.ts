import { getHarpStrata } from 'harpstrata'
import { TuningIds, PitchIds, PozitionIds, ValvingIds } from 'harpparts'

import { DisplayModes } from '../../../../types'

import { reduceForNewHarpStrataByTuning } from './reduce-for-new-harp-strata-by-tuning'

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
  tuningId: TuningIds.Country,
}
const naturalMinorHarpProps = {
  ...baseHarpStrataProps,
  tuningId: TuningIds.NaturalMinor,
}

const majorDiatonicHarp = getHarpStrata(majorDiatonicHarpProps)
const countryTunedHarp = getHarpStrata(countryTunedHarpProps)
const naturalMinorHarp = getHarpStrata(naturalMinorHarpProps)

test('provides HarpStrata updated by tuning set to natural minor', () => {
  const activeHarpStrata = countryTunedHarp
  const { Degree: activeDisplayMode } = DisplayModes
  const { NaturalMinor: tuningId } = TuningIds

  const newActiveHarpStrata = reduceForNewHarpStrataByTuning(
    activeHarpStrata,
    activeDisplayMode,
    tuningId
  )

  expect(newActiveHarpStrata).toStrictEqual(naturalMinorHarp)
})

test('provides HarpStrata updated by tuning to major diatonic', () => {
  const activeHarpStrata = countryTunedHarp
  const { Degree: activeDisplayMode } = DisplayModes
  const { MajorDiatonic: tuningId } = TuningIds

  const newActiveHarpStrata = reduceForNewHarpStrataByTuning(
    activeHarpStrata,
    activeDisplayMode,
    tuningId
  )

  expect(newActiveHarpStrata).toStrictEqual(majorDiatonicHarp)
})
