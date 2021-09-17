import { useGlobal } from 'reactn'

import { inactiveCellsHarpStrata as activeHarpStrata } from '../../../../test-resources'

import { useOctaveColumnGroups } from './use-octave-column-groups'

jest.mock('reactn')
const mockUseGlobal = useGlobal as jest.Mock

test('Identifies the columns grouped by octave', () => {
  mockUseGlobal.mockImplementation((stateItem: string) => {
    if (stateItem === 'activeHarpStrata') return [activeHarpStrata]
    if (stateItem === 'fragmentHarpFaceByOctaves') return [true]
    return undefined
  })
  const octaveColumnGroups = useOctaveColumnGroups()
  const expectedOctaveGroups = [[0, 1, 2], [3, 4, 5], [6, 7, 8], [9]]

  expect(octaveColumnGroups).toStrictEqual(expectedOctaveGroups)
})

test('Returns an ungrouped set if the harp fragmentation is off', () => {
  mockUseGlobal.mockImplementation((stateItem: string) => {
    if (stateItem === 'activeHarpStrata') return [activeHarpStrata]
    if (stateItem === 'fragmentHarpFaceByOctaves') return [false]
    return undefined
  })
  const octaveColumnGroups = useOctaveColumnGroups()
  const expectedOctaveGroups = [[0, 1, 2, 3, 4, 5, 6, 7, 8, 9]]

  expect(octaveColumnGroups).toStrictEqual(expectedOctaveGroups)
})
