import { useGlobal } from 'reactn'
import {
  PitchIds,
  HarpStrataProps,
  ApparatusIds,
  PozitionIds,
  ActiveIds,
  HarpStrata,
  getHarpStrata,
  DegreeIds,
} from 'harpstrata'

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
export const keyCHarpStrata: HarpStrata = getHarpStrata(keyCHarpStrataProps)
export const cHarpSecondPozHarpStrata: HarpStrata = getHarpStrata(
  cHarpSecondPozHarpStrataProps
)

const setActiveHarpStrata = jest.fn()
mockUseGlobal.mockReturnValue([keyCHarpStrata, setActiveHarpStrata])

test('The function returns a harpstrata with the pozition shifted to meet the root pitch requirement', () => {
  const { G: newRootPitchId } = PitchIds

  const expectedHarpStrata = cHarpSecondPozHarpStrata
  const setPozitionRoot = useSetPozitionRoot()
  setPozitionRoot(newRootPitchId)

  expect(setActiveHarpStrata.mock.calls[0][0]).toStrictEqual(expectedHarpStrata)
})
