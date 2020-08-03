import { useGlobal } from 'reactn'
import { ApparatusIds, PozitionIds, PitchIds, getHarpStrata } from 'harpstrata'

import { DisplayModes } from '../../../../types'

import { useNudgeHarpStrataByHarpKey } from './use-nudge-harp-strata-by-harp-key'

jest.mock('reactn')
const mockUseGlobal = useGlobal as jest.Mock

const baseHarpStrataProps = {
  apparatusId: ApparatusIds.MajorDiatonic,
  pozitionId: PozitionIds.First,
  harpKeyId: PitchIds.C,
  activeIds: [],
}
const cHarpFirstPozitionProps = baseHarpStrataProps
// Sixth position puts the root a semi tone lower than in First which is whats required to keep it the same while incrementing the harp key
const dbHarpFirstPozitionProps = {
  ...baseHarpStrataProps,
  harpKeyId: PitchIds.Db,
  pozitionId: PozitionIds.Sixth,
}

const cHarpFirstPozition = getHarpStrata(cHarpFirstPozitionProps)
const dbHarpFirstPozition = getHarpStrata(dbHarpFirstPozitionProps)

test('provides incremented HarpStrata by harp key along with pozition id', () => {
  const setActiveHarpStrata = jest.fn()
  mockUseGlobal.mockImplementation((stateItem: string) => {
    if (stateItem === 'activeHarpStrata')
      return [cHarpFirstPozition, setActiveHarpStrata]
    if (stateItem === 'activeDisplayMode') return [DisplayModes.Degree]
    return undefined
  })
  const nudgeHarpStrataByHarpKey = useNudgeHarpStrataByHarpKey()
  nudgeHarpStrataByHarpKey('UP')

  expect(setActiveHarpStrata.mock.calls[0][0]).toStrictEqual(
    dbHarpFirstPozition
  )
})

test('provides decremented HarpStrata by harp key along with pozition id', () => {
  const setActiveHarpStrata = jest.fn()
  mockUseGlobal.mockImplementation((stateItem: string) => {
    if (stateItem === 'activeHarpStrata')
      return [dbHarpFirstPozition, setActiveHarpStrata]
    if (stateItem === 'activeDisplayMode') return [DisplayModes.Degree]
    return undefined
  })
  const nudgeHarpStrataByHarpKey = useNudgeHarpStrataByHarpKey()
  nudgeHarpStrataByHarpKey('DOWN')

  expect(setActiveHarpStrata.mock.calls[0][0]).toStrictEqual(cHarpFirstPozition)
})
