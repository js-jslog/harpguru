import { useGlobal } from 'reactn'
import { getHarpStrata, ApparatusIds, PozitionIds, PitchIds, DegreeIds } from 'harpstrata'

import { useFlushBatchIdToggles } from './use-flush-batch-id-toggles'

jest.mock('reactn')
const mockUseGlobal = useGlobal as jest.Mock

const baseHarpStrataProps = {
  apparatusId: ApparatusIds.MajorDiatonic,
  pozitionId: PozitionIds.First,
  harpKeyId: PitchIds.C,
  activeIds: [],
}
const inactiveHarpStrataProps = baseHarpStrataProps
const inactiveHarpStrata = getHarpStrata(inactiveHarpStrataProps)
const rootActiveHarpStrata = {
  ...baseHarpStrataProps,
  activeIds: [ DegreeIds.Root ]
}

test('a harpstrata with empty activeDegreeIds has all the batch ids activated', () => {
  jest.useFakeTimers()
  const setActiveHarpStrata = jest.fn()
  mockUseGlobal.mockImplementation((stateItem: string) => {
    if (stateItem === 'activeHarpStrata')
      return [inactiveHarpStrata, setActiveHarpStrata]
    if (stateItem === 'toggleDegreeIdsBuffer') return [DegreeIds.Root]
    return undefined
  })

  useFlushBatchIdToggles()
  expect(setActiveHarpStrata.mock.calls[0][0]).toStrictEqual(rootActiveHarpStrata)
})
