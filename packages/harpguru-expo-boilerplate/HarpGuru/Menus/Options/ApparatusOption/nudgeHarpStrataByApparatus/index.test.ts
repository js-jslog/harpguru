import {ApparatusIds, PozitionIds, PitchIds, getHarpStrata} from 'harpstrata'

import { nudgeHarpStrataByApparatus } from './index'

const baseHarpStrataProps = {
  apparatusId: ApparatusIds.MajorDiatonic,
  pozitionId: PozitionIds.First,
  harpKeyId: PitchIds.C,
  activeIds: [],
}
const majorDiatonicHarpProps = baseHarpStrataProps
const countryTunedHarpProps = { ...baseHarpStrataProps, apparatusId: ApparatusIds.CountryTuned }
const naturalMinorHarpProps = { ...baseHarpStrataProps, apparatusId: ApparatusIds.NaturalMinor }

const majorDiatonicHarp = getHarpStrata(majorDiatonicHarpProps)
const countryTunedHarp = getHarpStrata(countryTunedHarpProps)
const naturalMinorHarp = getHarpStrata(naturalMinorHarpProps)

test('provides incremented HarpStrata by apparatus', () => {
  const setActiveHarpStrata = jest.fn()
  const partialParams = {
    activeHarpStrata: countryTunedHarp,
    setActiveHarpStrata
  }
  nudgeHarpStrataByApparatus(partialParams, 'UP')

  expect(setActiveHarpStrata.mock.calls[0][0]).toStrictEqual(naturalMinorHarp)
})

test('provides decremented HarpStrata by apparatus', () => {
  const setActiveHarpStrata = jest.fn()
  const partialParams = {
    activeHarpStrata: countryTunedHarp,
    setActiveHarpStrata
  }
  nudgeHarpStrataByApparatus(partialParams, 'DOWN')

  expect(setActiveHarpStrata.mock.calls[0][0]).toStrictEqual(majorDiatonicHarp)
})

test('provides incremented HarpStrata by apparatus across array limit', () => {
  const setActiveHarpStrata = jest.fn()
  const partialParams = {
    activeHarpStrata: naturalMinorHarp,
    setActiveHarpStrata
  }
  nudgeHarpStrataByApparatus(partialParams, 'UP')

  expect(setActiveHarpStrata.mock.calls[0][0]).toStrictEqual(majorDiatonicHarp)
})

test('provides decremented HarpStrata by apparatus across array limit', () => {
  const setActiveHarpStrata = jest.fn()
  const partialParams = {
    activeHarpStrata: majorDiatonicHarp,
    setActiveHarpStrata
  }
  nudgeHarpStrataByApparatus(partialParams, 'DOWN')

  expect(setActiveHarpStrata.mock.calls[0][0]).toStrictEqual(naturalMinorHarp)
})
