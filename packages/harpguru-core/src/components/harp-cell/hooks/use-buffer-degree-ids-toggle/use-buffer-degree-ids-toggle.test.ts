import { useGlobal } from 'reactn'
import { DegreeIds } from 'harpstrata'
import type {ActiveDegreeIds} from 'harpstrata'

import { useBufferDegreeIdsToggle } from './use-buffer-degree-ids-toggle'

jest.mock('reactn')
const mockUseGlobal = useGlobal as jest.Mock

test('adding a toggle id to empty toggle buffer is successful', () => {
  const toggleDegreeIdsBuffer = [] as ActiveDegreeIds
  const setToggleDegreeIdsBuffer = jest.fn()
  mockUseGlobal.mockReturnValue([toggleDegreeIdsBuffer, setToggleDegreeIdsBuffer])

  useBufferDegreeIdsToggle(DegreeIds.Flat6)

  expect(setToggleDegreeIdsBuffer.mock.calls[0][0]).toStrictEqual([DegreeIds.Flat6])
})
