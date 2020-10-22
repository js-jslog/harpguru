import { useGlobal } from 'reactn'
import { DegreeIds } from 'harpstrata'
import type { ActiveDegreeIds } from 'harpstrata'

import { useBufferDegreeIdsToggle } from './use-buffer-degree-ids-toggle'

jest.mock('reactn')
const mockUseGlobal = useGlobal as jest.Mock

test('adding a toggle id to empty toggle buffer is successful', () => {
  const toggleDegreeIdsBuffer = [] as ActiveDegreeIds
  const setToggleDegreeIdsBuffer = jest.fn()
  mockUseGlobal.mockReturnValue([
    toggleDegreeIdsBuffer,
    setToggleDegreeIdsBuffer,
  ])

  useBufferDegreeIdsToggle()(DegreeIds.Flat6)

  expect(setToggleDegreeIdsBuffer.mock.calls.length).toBe(1)
  expect(setToggleDegreeIdsBuffer.mock.calls[0][0]).toStrictEqual([
    DegreeIds.Flat6,
  ])
})

test('adding a toggle id to a toggle buffer with the id already present carries no action', () => {
  const toggleDegreeIdsBuffer = [DegreeIds.Flat6] as ActiveDegreeIds
  const setToggleDegreeIdsBuffer = jest.fn()
  mockUseGlobal.mockReturnValue([
    toggleDegreeIdsBuffer,
    setToggleDegreeIdsBuffer,
  ])

  useBufferDegreeIdsToggle()(DegreeIds.Flat6)

  expect(setToggleDegreeIdsBuffer.mock.calls.length).toBe(0)
})
