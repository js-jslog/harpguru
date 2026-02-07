import { DegreeIds } from 'harpparts'

import { buildMockStoreState } from '../../../../test-resources'
import { useHarpGuruStore } from '../../../../store'

import { useAddBufferedActivityToggle } from './use-add-buffered-activity-toggle'

jest.mock('../../../../store', () => ({ useHarpGuruStore: jest.fn() }))
const mockUseHarpGuruStore = useHarpGuruStore as jest.Mock

test('adding a toggle id to empty toggle buffer is successful', () => {
  const bufferedActivityToggles = [] as ReadonlyArray<DegreeIds>
  const mockState = buildMockStoreState({ bufferedActivityToggles })
  mockUseHarpGuruStore.mockImplementation(
    (selector: (s: typeof mockState) => unknown) => selector(mockState)
  )

  useAddBufferedActivityToggle()(DegreeIds.Flat6)

  expect(
    (mockState.setBufferedActivityToggles as jest.Mock).mock.calls.length
  ).toBe(1)
  expect(
    (mockState.setBufferedActivityToggles as jest.Mock).mock.calls[0][0]
  ).toStrictEqual([DegreeIds.Flat6])
})

test('adding a toggle id to a toggle buffer with the id already present calls the setter again with the same array', () => {
  const bufferedActivityToggles = [
    DegreeIds.Flat2,
    DegreeIds.Flat6,
  ] as ReadonlyArray<DegreeIds>
  const mockState = buildMockStoreState({ bufferedActivityToggles })
  mockUseHarpGuruStore.mockImplementation(
    (selector: (s: typeof mockState) => unknown) => selector(mockState)
  )

  useAddBufferedActivityToggle()(DegreeIds.Flat6)

  expect(
    (mockState.setBufferedActivityToggles as jest.Mock).mock.calls.length
  ).toBe(1)
  expect(
    (mockState.setBufferedActivityToggles as jest.Mock).mock.calls[0][0]
  ).toStrictEqual([DegreeIds.Flat2, DegreeIds.Flat6])
})
