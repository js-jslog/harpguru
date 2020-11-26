import { useGlobal } from 'reactn'
import { ApparatusIds, PitchIds, getHarpStrata } from 'harpstrata'
import { PozitionIds } from 'harpparts'

import { useNudgeHarpStrataByApparatus } from './use-nudge-harp-strata-by-apparatus'

jest.mock('reactn')
const mockUseGlobal = useGlobal as jest.Mock

const baseHarpStrataProps = {
  apparatusId: ApparatusIds.MajorDiatonic,
  pozitionId: PozitionIds.First,
  harpKeyId: PitchIds.C,
  activeIds: [],
}
const majorDiatonicHarpProps = baseHarpStrataProps
const countryTunedHarpProps = {
  ...baseHarpStrataProps,
  apparatusId: ApparatusIds.CountryTuned,
}
const naturalMinorHarpProps = {
  ...baseHarpStrataProps,
  apparatusId: ApparatusIds.NaturalMinor,
}
const powerBenderHarpProps = {
  ...baseHarpStrataProps,
  apparatusId: ApparatusIds.PowerBender,
}

const majorDiatonicHarp = getHarpStrata(majorDiatonicHarpProps)
const countryTunedHarp = getHarpStrata(countryTunedHarpProps)
const naturalMinorHarp = getHarpStrata(naturalMinorHarpProps)
const powerBenderHarp = getHarpStrata(powerBenderHarpProps)

test('provides incremented HarpStrata by apparatus', () => {
  const setActiveHarpStrata = jest.fn()
  mockUseGlobal.mockReturnValue([countryTunedHarp, setActiveHarpStrata])
  const nudgeHarpStrataByApparatus = useNudgeHarpStrataByApparatus()
  nudgeHarpStrataByApparatus('UP')

  expect(setActiveHarpStrata.mock.calls[0][0]).toStrictEqual(naturalMinorHarp)
})

test('provides decremented HarpStrata by apparatus', () => {
  const setActiveHarpStrata = jest.fn()
  mockUseGlobal.mockReturnValue([countryTunedHarp, setActiveHarpStrata])
  const nudgeHarpStrataByApparatus = useNudgeHarpStrataByApparatus()
  nudgeHarpStrataByApparatus('DOWN')

  expect(setActiveHarpStrata.mock.calls[0][0]).toStrictEqual(majorDiatonicHarp)
})

// NOTE: the next two tests were testing across array limits when they were written
// if functionality is being enhanced in this area you will want to check that the
// power bender harp is still the last in the list and major diatonic is still the
// first. Its a safe bet that the major diatonic will always be the first.
test('provides incremented HarpStrata by apparatus across array limit', () => {
  const setActiveHarpStrata = jest.fn()
  mockUseGlobal.mockReturnValue([powerBenderHarp, setActiveHarpStrata])
  const nudgeHarpStrataByApparatus = useNudgeHarpStrataByApparatus()
  nudgeHarpStrataByApparatus('UP')

  expect(setActiveHarpStrata.mock.calls[0][0]).toStrictEqual(majorDiatonicHarp)
})

test('provides decremented HarpStrata by apparatus across array limit', () => {
  const setActiveHarpStrata = jest.fn()
  mockUseGlobal.mockReturnValue([majorDiatonicHarp, setActiveHarpStrata])
  const nudgeHarpStrataByApparatus = useNudgeHarpStrataByApparatus()
  nudgeHarpStrataByApparatus('DOWN')

  expect(setActiveHarpStrata.mock.calls[0][0]).toStrictEqual(powerBenderHarp)
})
