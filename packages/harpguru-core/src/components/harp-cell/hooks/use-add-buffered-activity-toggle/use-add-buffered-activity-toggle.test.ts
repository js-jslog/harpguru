import { useGlobal } from 'reactn'
import { DegreeIds } from 'harpparts'

import { useAddBufferedActivityToggle } from './use-add-buffered-activity-toggle'

jest.mock('reactn')
const mockUseGlobal = useGlobal as jest.Mock

test('adding a toggle id to empty toggle buffer is successful', () => {
  const bufferedActivityToggles = [] as ReadonlyArray<DegreeIds>
  const setToggleDegreeIdsBuffer = jest.fn()
  mockUseGlobal.mockReturnValue([
    bufferedActivityToggles,
    setToggleDegreeIdsBuffer,
  ])

  useAddBufferedActivityToggle()(DegreeIds.Flat6)

  expect(setToggleDegreeIdsBuffer.mock.calls.length).toBe(1)
  expect(setToggleDegreeIdsBuffer.mock.calls[0][0]).toStrictEqual([
    DegreeIds.Flat6,
  ])
})

test('adding a toggle id to a toggle buffer with the id already present calls the setter again with the same array', () => {
  const bufferedActivityToggles = [
    DegreeIds.Flat2,
    DegreeIds.Flat6,
  ] as ReadonlyArray<DegreeIds>
  const setToggleDegreeIdsBuffer = jest.fn()
  mockUseGlobal.mockReturnValue([
    bufferedActivityToggles,
    setToggleDegreeIdsBuffer,
  ])

  useAddBufferedActivityToggle()(DegreeIds.Flat6)

  expect(setToggleDegreeIdsBuffer.mock.calls.length).toBe(1)
  expect(setToggleDegreeIdsBuffer.mock.calls[0][0]).toStrictEqual([
    DegreeIds.Flat2,
    DegreeIds.Flat6,
  ])
})
