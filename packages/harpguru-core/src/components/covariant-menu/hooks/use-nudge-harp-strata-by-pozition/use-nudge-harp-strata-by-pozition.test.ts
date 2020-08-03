import { useGlobal } from 'reactn'
import { ApparatusIds, PozitionIds, PitchIds, getHarpStrata } from 'harpstrata'

import { DisplayModes } from '../../../../types'

import { useNudgeHarpStrataByPozition } from './use-nudge-harp-strata-by-pozition'

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

const cHarpFirstPozition = getHarpStrata(cHarpFirstPozitionProps)
const cHarpSecondPozition = getHarpStrata(cHarpSecondPozitionProps)

test('provides incremented HarpStrata by pozition along with root pitch id', () => {
  const setActiveHarpStrata = jest.fn()
  mockUseGlobal.mockImplementation((stateItem: string) => {
    if (stateItem === 'activeHarpStrata')
      return [cHarpFirstPozition, setActiveHarpStrata]
    if (stateItem === 'activeDisplayMode') return [DisplayModes.Degree]
    return undefined
  })
  const nudgeHarpStrataByPozition = useNudgeHarpStrataByPozition()
  nudgeHarpStrataByPozition('UP')

  expect(setActiveHarpStrata.mock.calls[0][0]).toStrictEqual(
    cHarpSecondPozition
  )
})

test('provides decremented HarpStrata by pozition along with root pitch id', () => {
  const setActiveHarpStrata = jest.fn()
  mockUseGlobal.mockImplementation((stateItem: string) => {
    if (stateItem === 'activeHarpStrata')
      return [cHarpSecondPozition, setActiveHarpStrata]
    if (stateItem === 'activeDisplayMode') return [DisplayModes.Degree]
    return undefined
  })
  const nudgeHarpStrataByPozition = useNudgeHarpStrataByPozition()
  nudgeHarpStrataByPozition('DOWN')

  expect(setActiveHarpStrata.mock.calls[0][0]).toStrictEqual(cHarpFirstPozition)
})
