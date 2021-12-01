import { useGlobal } from 'reactn'

import { buildMockUseGlobalImplementation } from '../../test-resources'

import { useOctaveColumnGroupsFragmentAware } from './use-octave-column-groups-fragment-aware'

jest.mock('reactn')
const mockUseGlobal = useGlobal as jest.Mock

test('Identifies the columns grouped by octave', () => {
  mockUseGlobal.mockImplementation(
    buildMockUseGlobalImplementation({
      fragmentHarpFaceByOctaves: true,
    })
  )
  const octaveColumnGroups = useOctaveColumnGroupsFragmentAware('harpface1')
  const expectedOctaveGroups = [[0], [1, 2, 3, 4], [5, 6, 7], [8, 9]]

  expect(octaveColumnGroups).toStrictEqual(expectedOctaveGroups)
})

test('Returns an ungrouped set if the harp fragmentation is off', () => {
  mockUseGlobal.mockImplementation(
    buildMockUseGlobalImplementation({
      fragmentHarpFaceByOctaves: false,
    })
  )
  const octaveColumnGroups = useOctaveColumnGroupsFragmentAware('harpface1')
  const expectedOctaveGroups = [[0, 1, 2, 3, 4, 5, 6, 7, 8, 9]]

  expect(octaveColumnGroups).toStrictEqual(expectedOctaveGroups)
})

test('Returns a bounded grouped set', () => {
  mockUseGlobal.mockImplementation(
    buildMockUseGlobalImplementation({
      sourceColumnBounds: [2, 7],
      fragmentHarpFaceByOctaves: true,
    })
  )
  const octaveColumnGroups = useOctaveColumnGroupsFragmentAware('harpface1')
  const expectedOctaveGroups = [
    [2, 3, 4],
    [5, 6, 7],
  ]

  expect(octaveColumnGroups).toStrictEqual(expectedOctaveGroups)
})

test('Returns a bounded ungrouped set', () => {
  mockUseGlobal.mockImplementation(
    buildMockUseGlobalImplementation({
      sourceColumnBounds: [3, 8],
      fragmentHarpFaceByOctaves: false,
    })
  )
  const octaveColumnGroups = useOctaveColumnGroupsFragmentAware('harpface1')
  const expectedOctaveGroups = [[3, 4, 5, 6, 7, 8]]

  expect(octaveColumnGroups).toStrictEqual(expectedOctaveGroups)
})
