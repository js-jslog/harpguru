import { useGlobal } from 'reactn'
import { ApparatusIds, PitchIds, getHarpStrata } from 'harpstrata'
import { PozitionIds } from 'harpparts'

import { DisplayModes } from '../../../../types'
import { CovariantMembers } from '../../../../packages/covariance-series'

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
const dbHarpFirstPozitionProps = {
  ...baseHarpStrataProps,
  harpKeyId: PitchIds.Db,
}

const cHarpFirstPozition = getHarpStrata(cHarpFirstPozitionProps)
const cHarpEighthPozition = getHarpStrata(cHarpEighthPozitionProps)
const dbHarpFirstPozition = getHarpStrata(dbHarpFirstPozitionProps)

test('provides incremented HarpStrata by root pitch along with pozition id when harp key is locked', () => {
  const setActiveHarpStrata = jest.fn()
  mockUseGlobal.mockImplementation((stateItem: string) => {
    if (stateItem === 'activeHarpStrata')
      return [cHarpFirstPozition, setActiveHarpStrata]
    if (stateItem === 'activeDisplayMode') return [DisplayModes.Degree]
    if (stateItem === 'lockedCovariant') return [CovariantMembers.HarpKey]
    return undefined
  })
  const nudgeHarpStrataByRootPitch = useNudgeHarpStrataByRootPitch()
  nudgeHarpStrataByRootPitch('UP')

  expect(setActiveHarpStrata.mock.calls[0][0]).toStrictEqual(
    cHarpEighthPozition
  )
})

test('provides decremented HarpStrata by root pitch along with pozition id when harp key is locked', () => {
  const setActiveHarpStrata = jest.fn()
  mockUseGlobal.mockImplementation((stateItem: string) => {
    if (stateItem === 'activeHarpStrata')
      return [cHarpEighthPozition, setActiveHarpStrata]
    if (stateItem === 'activeDisplayMode') return [DisplayModes.Degree]
    if (stateItem === 'lockedCovariant') return [CovariantMembers.HarpKey]
    return undefined
  })
  const nudgeHarpStrataByRootPitch = useNudgeHarpStrataByRootPitch()
  nudgeHarpStrataByRootPitch('DOWN')

  expect(setActiveHarpStrata.mock.calls[0][0]).toStrictEqual(cHarpFirstPozition)
})

test('provides incremented HarpStrata by root pitch along with harp key when pozition is locked', () => {
  const setActiveHarpStrata = jest.fn()
  mockUseGlobal.mockImplementation((stateItem: string) => {
    if (stateItem === 'activeHarpStrata')
      return [cHarpFirstPozition, setActiveHarpStrata]
    if (stateItem === 'activeDisplayMode') return [DisplayModes.Degree]
    if (stateItem === 'lockedCovariant') return [CovariantMembers.Pozition]
    return undefined
  })
  const nudgeHarpStrataByRootPitch = useNudgeHarpStrataByRootPitch()
  nudgeHarpStrataByRootPitch('UP')

  expect(setActiveHarpStrata.mock.calls[0][0]).toStrictEqual(
    dbHarpFirstPozition
  )
})

test('provides decremented HarpStrata by root pitch along with harp key when pozition is locked', () => {
  const setActiveHarpStrata = jest.fn()
  mockUseGlobal.mockImplementation((stateItem: string) => {
    if (stateItem === 'activeHarpStrata')
      return [dbHarpFirstPozition, setActiveHarpStrata]
    if (stateItem === 'activeDisplayMode') return [DisplayModes.Degree]
    if (stateItem === 'lockedCovariant') return [CovariantMembers.Pozition]
    return undefined
  })
  const nudgeHarpStrataByRootPitch = useNudgeHarpStrataByRootPitch()
  nudgeHarpStrataByRootPitch('DOWN')

  expect(setActiveHarpStrata.mock.calls[0][0]).toStrictEqual(cHarpFirstPozition)
})

test('no change when the root pitch is the locked covariant member', () => {
  const setActiveHarpStrata = jest.fn()
  mockUseGlobal.mockImplementation((stateItem: string) => {
    if (stateItem === 'activeHarpStrata')
      return [cHarpFirstPozition, setActiveHarpStrata]
    if (stateItem === 'activeDisplayMode') return [DisplayModes.Degree]
    if (stateItem === 'lockedCovariant') return [CovariantMembers.RootPitch]
    return undefined
  })
  const nudgeHarpStrataByRootPitch = useNudgeHarpStrataByRootPitch()

  nudgeHarpStrataByRootPitch('UP')
  expect(setActiveHarpStrata.mock.calls.length).toBe(0)

  nudgeHarpStrataByRootPitch('DOWN')
  expect(setActiveHarpStrata.mock.calls.length).toBe(0)
})
