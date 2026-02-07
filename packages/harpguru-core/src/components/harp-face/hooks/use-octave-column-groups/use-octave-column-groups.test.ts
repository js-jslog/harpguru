import { mockStoreImplementation } from '../../../../test-resources'
import { useHarpGuruStore } from '../../../../store'

import { useOctaveColumnGroups } from './use-octave-column-groups'

jest.mock('../../../../store', () => ({ useHarpGuruStore: jest.fn() }))
const mockUseHarpGuruStore = useHarpGuruStore as jest.Mock

test('Identifies the columns grouped by octave', () => {
  mockUseHarpGuruStore.mockImplementation(
    mockStoreImplementation({
      fragmentHarpFaceByOctaves: true,
    })
  )
  const octaveColumnGroups = useOctaveColumnGroups()
  const expectedOctaveGroups = [[0], [1, 2, 3, 4], [5, 6, 7], [8, 9]]

  expect(octaveColumnGroups).toStrictEqual(expectedOctaveGroups)
})

test('Returns an ungrouped set if the harp fragmentation is off', () => {
  mockUseHarpGuruStore.mockImplementation(
    mockStoreImplementation({
      fragmentHarpFaceByOctaves: false,
    })
  )
  const octaveColumnGroups = useOctaveColumnGroups()
  const expectedOctaveGroups = [[0, 1, 2, 3, 4, 5, 6, 7, 8, 9]]

  expect(octaveColumnGroups).toStrictEqual(expectedOctaveGroups)
})

test('Returns a bounded grouped set', () => {
  mockUseHarpGuruStore.mockImplementation(
    mockStoreImplementation({
      sourceColumnBounds: [2, 7],
      fragmentHarpFaceByOctaves: true,
    })
  )
  const octaveColumnGroups = useOctaveColumnGroups()
  const expectedOctaveGroups = [
    [2, 3, 4],
    [5, 6, 7],
  ]

  expect(octaveColumnGroups).toStrictEqual(expectedOctaveGroups)
})

test('Returns a bounded ungrouped set', () => {
  mockUseHarpGuruStore.mockImplementation(
    mockStoreImplementation({
      sourceColumnBounds: [3, 8],
      fragmentHarpFaceByOctaves: false,
    })
  )
  const octaveColumnGroups = useOctaveColumnGroups()
  const expectedOctaveGroups = [[3, 4, 5, 6, 7, 8]]

  expect(octaveColumnGroups).toStrictEqual(expectedOctaveGroups)
})
