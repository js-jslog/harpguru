import { useGlobal } from 'reactn'
import { ApparatusIds, PitchIds, getHarpStrata } from 'harpstrata'
import { PozitionIds } from 'harpparts'

import { DisplayModes } from '../../../../types'
import { CovariantMembers } from '../../../../packages/covariance-series'

import { useSetHarpStrataByPozition } from './use-set-harp-strata-by-pozition'

jest.mock('reactn')
const mockUseGlobal = useGlobal as jest.Mock

const baseHarpStrataProps = {
  apparatusId: ApparatusIds.MajorDiatonic,
  pozitionId: PozitionIds.First,
  harpKeyId: PitchIds.C,
  activeIds: [],
}
const cHarpFirstPozitionProps = baseHarpStrataProps
const cHarpSecondPozitionProps = {
  ...baseHarpStrataProps,
  pozitionId: PozitionIds.Second,
}
const fHarpSecondPozitionProps = {
  ...baseHarpStrataProps,
  harpKeyId: PitchIds.F,
  pozitionId: PozitionIds.Second,
}

const cHarpFirstPozition = getHarpStrata(cHarpFirstPozitionProps)
const cHarpSecondPozition = getHarpStrata(cHarpSecondPozitionProps)
const fHarpSecondPozition = getHarpStrata(fHarpSecondPozitionProps)

test('provides HarpStrata updated by pozition along with root pitch id when harp key is locked', () => {
  const setActiveHarpStrata = jest.fn()
  mockUseGlobal.mockImplementation((stateItem: string) => {
    if (stateItem === 'activeHarpStrata')
      return [cHarpFirstPozition, setActiveHarpStrata]
    if (stateItem === 'activeDisplayMode') return [DisplayModes.Degree]
    if (stateItem === 'lockedCovariant') return [CovariantMembers.HarpKey]
    return undefined
  })
  const setHarpStrataByPozition = useSetHarpStrataByPozition()
  setHarpStrataByPozition(PozitionIds.Second)

  expect(setActiveHarpStrata.mock.calls[0][0]).toStrictEqual(
    cHarpSecondPozition
  )
})

test('provides HarpStrata updated by pozition along with root pitch id when harp key is locked', () => {
  const setActiveHarpStrata = jest.fn()
  mockUseGlobal.mockImplementation((stateItem: string) => {
    if (stateItem === 'activeHarpStrata')
      return [cHarpSecondPozition, setActiveHarpStrata]
    if (stateItem === 'activeDisplayMode') return [DisplayModes.Degree]
    if (stateItem === 'lockedCovariant') return [CovariantMembers.HarpKey]
    return undefined
  })
  const setHarpStrataByPozition = useSetHarpStrataByPozition()
  setHarpStrataByPozition(PozitionIds.First)

  expect(setActiveHarpStrata.mock.calls[0][0]).toStrictEqual(cHarpFirstPozition)
})

test('provides HarpStrata updated by pozition along with harp key id when root pitch is locked', () => {
  const setActiveHarpStrata = jest.fn()
  mockUseGlobal.mockImplementation((stateItem: string) => {
    if (stateItem === 'activeHarpStrata')
      return [cHarpFirstPozition, setActiveHarpStrata]
    if (stateItem === 'activeDisplayMode') return [DisplayModes.Degree]
    if (stateItem === 'lockedCovariant') return [CovariantMembers.RootPitch]
    return undefined
  })
  const setHarpStrataByPozition = useSetHarpStrataByPozition()
  setHarpStrataByPozition(PozitionIds.Second)

  expect(setActiveHarpStrata.mock.calls[0][0]).toStrictEqual(
    fHarpSecondPozition
  )
})

test('provides HarpStrata updated by pozition along with harp key id when root pitch is locked', () => {
  const setActiveHarpStrata = jest.fn()
  mockUseGlobal.mockImplementation((stateItem: string) => {
    if (stateItem === 'activeHarpStrata')
      return [fHarpSecondPozition, setActiveHarpStrata]
    if (stateItem === 'activeDisplayMode') return [DisplayModes.Degree]
    if (stateItem === 'lockedCovariant') return [CovariantMembers.RootPitch]
    return undefined
  })
  const setHarpStrataByPozition = useSetHarpStrataByPozition()
  setHarpStrataByPozition(PozitionIds.First)

  expect(setActiveHarpStrata.mock.calls[0][0]).toStrictEqual(cHarpFirstPozition)
})

test('no change when the pozition is the locked covariant member', () => {
  const setActiveHarpStrata = jest.fn()
  mockUseGlobal.mockImplementation((stateItem: string) => {
    if (stateItem === 'activeHarpStrata')
      return [cHarpFirstPozition, setActiveHarpStrata]
    if (stateItem === 'activeDisplayMode') return [DisplayModes.Degree]
    if (stateItem === 'lockedCovariant') return [CovariantMembers.Pozition]
    return undefined
  })
  const setHarpStrataByPozition = useSetHarpStrataByPozition()

  setHarpStrataByPozition(PozitionIds.Eighth)
  expect(setActiveHarpStrata.mock.calls.length).toBe(0)
})
