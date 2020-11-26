import { useGlobal } from 'reactn'
import {
  PitchIds,
  HarpStrataProps,
  ApparatusIds,
  ActiveIds,
  HarpStrata,
  getHarpStrata,
  DegreeIds,
} from 'harpstrata'
import { PozitionIds } from 'harpparts'

import { CovariantMembers } from '../../../../packages/covariance-series'

import { useSetPozitionRoot } from './index'

jest.mock('reactn')
const mockUseGlobal = useGlobal as jest.Mock

const baseHarpStrataProps: HarpStrataProps = {
  apparatusId: ApparatusIds.MajorDiatonic,
  pozitionId: PozitionIds.First,
  harpKeyId: PitchIds.C,
  activeIds: [DegreeIds.Root] as ActiveIds,
}
export const keyCHarpStrataProps: HarpStrataProps = {
  ...baseHarpStrataProps,
  harpKeyId: PitchIds.C,
}
export const cHarpSecondPozHarpStrataProps: HarpStrataProps = {
  ...baseHarpStrataProps,
  pozitionId: PozitionIds.Second,
  harpKeyId: PitchIds.C,
}
export const fHarpSecondPozHarpStrataProps: HarpStrataProps = {
  ...baseHarpStrataProps,
  pozitionId: PozitionIds.Second,
  harpKeyId: PitchIds.F,
}
export const keyCHarpStrata: HarpStrata = getHarpStrata(keyCHarpStrataProps)
export const cHarpSecondPozHarpStrata: HarpStrata = getHarpStrata(
  cHarpSecondPozHarpStrataProps
)
export const fHarpSecondPozHarpStrata: HarpStrata = getHarpStrata(
  fHarpSecondPozHarpStrataProps
)

const setActiveHarpStrata = jest.fn()

test('Returns a harpstrata in the relevant position with the root pitch shifted if the harp key is locked', () => {
  const { G: newRootPitchId } = PitchIds
  mockUseGlobal.mockImplementation((stateItem: string) => {
    if (stateItem === 'activeHarpStrata')
      return [keyCHarpStrata, setActiveHarpStrata]
    if (stateItem === 'lockedCovariant') return [CovariantMembers.HarpKey]
    return undefined
  })

  const expectedHarpStrata = cHarpSecondPozHarpStrata
  const setPozitionRoot = useSetPozitionRoot()
  setPozitionRoot(newRootPitchId)

  expect(setActiveHarpStrata.mock.calls[0][0]).toStrictEqual(expectedHarpStrata)
})

test('Returns a harpstrata in the relevant position with the harp key shifted if the root pitch is locked', () => {
  const { G: newRootPitchId } = PitchIds
  mockUseGlobal.mockImplementation((stateItem: string) => {
    if (stateItem === 'activeHarpStrata')
      return [keyCHarpStrata, setActiveHarpStrata]
    if (stateItem === 'lockedCovariant') return [CovariantMembers.RootPitch]
    return undefined
  })

  const expectedHarpStrata = fHarpSecondPozHarpStrata
  const setPozitionRoot = useSetPozitionRoot()
  setPozitionRoot(newRootPitchId)

  expect(setActiveHarpStrata.mock.calls[1][0]).toStrictEqual(expectedHarpStrata)
})
