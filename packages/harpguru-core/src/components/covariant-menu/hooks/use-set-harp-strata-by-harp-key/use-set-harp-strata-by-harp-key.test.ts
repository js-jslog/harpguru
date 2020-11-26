import { useGlobal } from 'reactn'
import { ApparatusIds, PitchIds, getHarpStrata } from 'harpstrata'
import { PozitionIds } from 'harpparts'

import { DisplayModes } from '../../../../types'
import { CovariantMembers } from '../../../../packages/covariance-series'

import { useSetHarpStrataByHarpKey } from './use-set-harp-strata-by-harp-key'

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
const dbHarpSixthPozitionProps = {
  ...baseHarpStrataProps,
  harpKeyId: PitchIds.Db,
  pozitionId: PozitionIds.Sixth,
}
const dbHarpFirstPozitionProps = {
  ...baseHarpStrataProps,
  harpKeyId: PitchIds.Db,
}

const cHarpFirstPozition = getHarpStrata(cHarpFirstPozitionProps)
const dbHarpSixthPozition = getHarpStrata(dbHarpSixthPozitionProps)
const dbHarpFirstPozition = getHarpStrata(dbHarpFirstPozitionProps)

test('provides HarpStrata updated by harp key along with pozition id when the root pitch is locked', () => {
  const setActiveHarpStrata = jest.fn()
  mockUseGlobal.mockImplementation((stateItem: string) => {
    if (stateItem === 'activeHarpStrata')
      return [cHarpFirstPozition, setActiveHarpStrata]
    if (stateItem === 'activeDisplayMode') return [DisplayModes.Degree]
    if (stateItem === 'lockedCovariant') return [CovariantMembers.RootPitch]
    return undefined
  })
  const setHarpStrataByHarpKey = useSetHarpStrataByHarpKey()
  setHarpStrataByHarpKey(PitchIds.Db)

  expect(setActiveHarpStrata.mock.calls[0][0]).toStrictEqual(
    dbHarpSixthPozition
  )
})

test('provides HarpStrata updated by harp key along with pozition id when the root pitch is locked', () => {
  const setActiveHarpStrata = jest.fn()
  mockUseGlobal.mockImplementation((stateItem: string) => {
    if (stateItem === 'activeHarpStrata')
      return [dbHarpSixthPozition, setActiveHarpStrata]
    if (stateItem === 'activeDisplayMode') return [DisplayModes.Degree]
    if (stateItem === 'lockedCovariant') return [CovariantMembers.RootPitch]
    return undefined
  })
  const setHarpStrataByHarpKey = useSetHarpStrataByHarpKey()
  setHarpStrataByHarpKey(PitchIds.C)

  expect(setActiveHarpStrata.mock.calls[0][0]).toStrictEqual(cHarpFirstPozition)
})

test('provides HarpStrata updated by harp key along with root pitch when the pozition is locked', () => {
  const setActiveHarpStrata = jest.fn()
  mockUseGlobal.mockImplementation((stateItem: string) => {
    if (stateItem === 'activeHarpStrata')
      return [cHarpFirstPozition, setActiveHarpStrata]
    if (stateItem === 'activeDisplayMode') return [DisplayModes.Degree]
    if (stateItem === 'lockedCovariant') return [CovariantMembers.Pozition]
    return undefined
  })
  const setHarpStrataByHarpKey = useSetHarpStrataByHarpKey()
  setHarpStrataByHarpKey(PitchIds.Db)

  expect(setActiveHarpStrata.mock.calls[0][0]).toStrictEqual(
    dbHarpFirstPozition
  )
})

test('provides HarpStrata updated by harp key along with root pitch when the pozition is locked', () => {
  const setActiveHarpStrata = jest.fn()
  mockUseGlobal.mockImplementation((stateItem: string) => {
    if (stateItem === 'activeHarpStrata')
      return [dbHarpFirstPozition, setActiveHarpStrata]
    if (stateItem === 'activeDisplayMode') return [DisplayModes.Degree]
    if (stateItem === 'lockedCovariant') return [CovariantMembers.Pozition]
    return undefined
  })
  const setHarpStrataByHarpKey = useSetHarpStrataByHarpKey()
  setHarpStrataByHarpKey(PitchIds.C)

  expect(setActiveHarpStrata.mock.calls[0][0]).toStrictEqual(cHarpFirstPozition)
})

test('no change when the harp key is the locked covariant member', () => {
  const setActiveHarpStrata = jest.fn()
  mockUseGlobal.mockImplementation((stateItem: string) => {
    if (stateItem === 'activeHarpStrata')
      return [cHarpFirstPozition, setActiveHarpStrata]
    if (stateItem === 'activeDisplayMode') return [DisplayModes.Degree]
    if (stateItem === 'lockedCovariant') return [CovariantMembers.HarpKey]
    return undefined
  })
  const setHarpStrataByHarpKey = useSetHarpStrataByHarpKey()

  setHarpStrataByHarpKey(PitchIds.Ab)
  expect(setActiveHarpStrata.mock.calls.length).toBe(0)
})
