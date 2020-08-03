import { useGlobal } from 'reactn'
import { ApparatusIds, PozitionIds, PitchIds, getHarpStrata } from 'harpstrata'

import { DisplayModes } from '../../../../types'

import { useNudgeHarpStrataByRootPitch } from './use-nudge-harp-strata-by-root-pitch'

jest.mock('reactn')
const mockUseGlobal = useGlobal as jest.Mock

const baseHarpStrataProps = {
  apparatusId: ApparatusIds.MajorDiatonic,
  pozitionId: PozitionIds.First,
  harpKeyId: PitchIds.C,
  activeIds: [],
}
const cHarpFirstPozitionProps = baseHarpStrataProps
// Eigth position puts the root a semi tone higher than in First
const cHarpEighthPozitionProps = {
  ...baseHarpStrataProps,
  pozitionId: PozitionIds.Eighth,
}

const cHarpFirstPozition = getHarpStrata(cHarpFirstPozitionProps)
const cHarpEighthPozition = getHarpStrata(cHarpEighthPozitionProps)

test('provides incremented HarpStrata by root pitch along with pozition id id', () => {
  const setActiveHarpStrata = jest.fn()
  mockUseGlobal.mockImplementation((stateItem: string) => {
    if (stateItem === 'activeHarpStrata')
      return [cHarpFirstPozition, setActiveHarpStrata]
    if (stateItem === 'activeDisplayMode') return [DisplayModes.Degree]
    return undefined
  })
  const nudgeHarpStrataByRootPitch = useNudgeHarpStrataByRootPitch()
  nudgeHarpStrataByRootPitch('UP')

  expect(setActiveHarpStrata.mock.calls[0][0]).toStrictEqual(
    cHarpEighthPozition
  )
})

test('provides decremented HarpStrata by root pitch along with pozition id id', () => {
  const setActiveHarpStrata = jest.fn()
  mockUseGlobal.mockImplementation((stateItem: string) => {
    if (stateItem === 'activeHarpStrata')
      return [cHarpEighthPozition, setActiveHarpStrata]
    if (stateItem === 'activeDisplayMode') return [DisplayModes.Degree]
    return undefined
  })
  const nudgeHarpStrataByRootPitch = useNudgeHarpStrataByRootPitch()
  nudgeHarpStrataByRootPitch('DOWN')

  expect(setActiveHarpStrata.mock.calls[0][0]).toStrictEqual(cHarpFirstPozition)
})
