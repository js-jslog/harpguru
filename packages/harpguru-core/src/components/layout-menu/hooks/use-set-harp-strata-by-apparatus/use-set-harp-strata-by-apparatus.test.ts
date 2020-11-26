import { useGlobal } from 'reactn'
import { ApparatusIds, PitchIds, getHarpStrata } from 'harpstrata'
import { PozitionIds } from 'harpparts'

import { useSetHarpStrataByApparatus } from './use-set-harp-strata-by-apparatus'

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

const majorDiatonicHarp = getHarpStrata(majorDiatonicHarpProps)
const countryTunedHarp = getHarpStrata(countryTunedHarpProps)
const naturalMinorHarp = getHarpStrata(naturalMinorHarpProps)

test('provides HarpStrata updated apparatus set to natural minor', () => {
  const setActiveHarpStrata = jest.fn()
  mockUseGlobal.mockReturnValue([countryTunedHarp, setActiveHarpStrata])
  const setHarpStrataByApparatus = useSetHarpStrataByApparatus()
  setHarpStrataByApparatus(ApparatusIds.NaturalMinor)

  expect(setActiveHarpStrata.mock.calls[0][0]).toStrictEqual(naturalMinorHarp)
})

test('provides HarpStrata updated by apparatus to major diatonic', () => {
  const setActiveHarpStrata = jest.fn()
  mockUseGlobal.mockReturnValue([countryTunedHarp, setActiveHarpStrata])
  const setHarpStrataByApparatus = useSetHarpStrataByApparatus()
  setHarpStrataByApparatus(ApparatusIds.MajorDiatonic)

  expect(setActiveHarpStrata.mock.calls[0][0]).toStrictEqual(majorDiatonicHarp)
})
