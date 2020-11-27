import { useGlobal } from 'reactn'
import { getHarpStrata } from 'harpstrata'
import { PozitionIds } from 'harpparts'
import { ApparatusIds, PitchIds } from 'harpparts'

import { DisplayModes } from '../../../../types'
import { CovariantMembers } from '../../../../packages/covariance-series'

import { useSetHarpStrataByRootPitch } from './use-set-harp-strata-by-root-pitch'

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

test('provides HarpStrata updated by root pitch along with pozition id when harp key is locked', () => {
  const setActiveHarpStrata = jest.fn()
  mockUseGlobal.mockImplementation((stateItem: string) => {
    if (stateItem === 'activeHarpStrata')
      return [cHarpFirstPozition, setActiveHarpStrata]
    if (stateItem === 'activeDisplayMode') return [DisplayModes.Degree]
    if (stateItem === 'lockedCovariant') return [CovariantMembers.HarpKey]
    return undefined
  })
  const setHarpStrataByRootPitch = useSetHarpStrataByRootPitch()
  setHarpStrataByRootPitch(PitchIds.Db)

  expect(setActiveHarpStrata.mock.calls[0][0]).toStrictEqual(
    cHarpEighthPozition
  )
})

test('provides HarpStrata updated by root pitch along with pozition id when harp key is locked', () => {
  const setActiveHarpStrata = jest.fn()
  mockUseGlobal.mockImplementation((stateItem: string) => {
    if (stateItem === 'activeHarpStrata')
      return [cHarpEighthPozition, setActiveHarpStrata]
    if (stateItem === 'activeDisplayMode') return [DisplayModes.Degree]
    if (stateItem === 'lockedCovariant') return [CovariantMembers.HarpKey]
    return undefined
  })
  const setHarpStrataByRootPitch = useSetHarpStrataByRootPitch()
  setHarpStrataByRootPitch(PitchIds.C)

  expect(setActiveHarpStrata.mock.calls[0][0]).toStrictEqual(cHarpFirstPozition)
})

test('provides HarpStrata updated by root pitch along with harp key when pozition is locked', () => {
  const setActiveHarpStrata = jest.fn()
  mockUseGlobal.mockImplementation((stateItem: string) => {
    if (stateItem === 'activeHarpStrata')
      return [cHarpFirstPozition, setActiveHarpStrata]
    if (stateItem === 'activeDisplayMode') return [DisplayModes.Degree]
    if (stateItem === 'lockedCovariant') return [CovariantMembers.Pozition]
    return undefined
  })
  const setHarpStrataByRootPitch = useSetHarpStrataByRootPitch()
  setHarpStrataByRootPitch(PitchIds.Db)

  expect(setActiveHarpStrata.mock.calls[0][0]).toStrictEqual(
    dbHarpFirstPozition
  )
})

test('provides HarpStrata updated by root pitch along with harp key when pozition is locked', () => {
  const setActiveHarpStrata = jest.fn()
  mockUseGlobal.mockImplementation((stateItem: string) => {
    if (stateItem === 'activeHarpStrata')
      return [dbHarpFirstPozition, setActiveHarpStrata]
    if (stateItem === 'activeDisplayMode') return [DisplayModes.Degree]
    if (stateItem === 'lockedCovariant') return [CovariantMembers.Pozition]
    return undefined
  })
  const setHarpStrataByRootPitch = useSetHarpStrataByRootPitch()
  setHarpStrataByRootPitch(PitchIds.C)

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
  const setHarpStrataByRootPitch = useSetHarpStrataByRootPitch()

  setHarpStrataByRootPitch(PitchIds.Ab)
  expect(setActiveHarpStrata.mock.calls.length).toBe(0)
})
