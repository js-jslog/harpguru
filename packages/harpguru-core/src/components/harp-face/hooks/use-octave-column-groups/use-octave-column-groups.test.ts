import { useGlobal } from 'reactn'

import { inactiveCellsHarpStrata as activeHarpStrata } from '../../../../test-resources'

import { useOctaveColumnGroups } from './use-octave-column-groups'

jest.mock('reactn')
const mockUseGlobal = useGlobal as jest.Mock
mockUseGlobal.mockImplementation((stateItem: string) => {
  if (stateItem === 'activeHarpStrata') return [activeHarpStrata]
  return undefined
})

test('Identifies the columns grouped by octave', () => {
  const octaveColumnGroups = useOctaveColumnGroups()
  const expectedOctaveGroups = [[0, 1, 2], [3, 4, 5], [6, 7, 8], [9]]

  expect(octaveColumnGroups).toStrictEqual(expectedOctaveGroups)
})
