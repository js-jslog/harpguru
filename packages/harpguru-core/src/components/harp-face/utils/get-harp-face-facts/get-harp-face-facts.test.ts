import { inactiveCellsHarpStrata as activeHarpStrata } from '../../../../test-resources'

import { getHarpFaceFacts } from './index'

test('Identifies the columns grouped by octave', () => {
  const { octaveColumnGroups } = getHarpFaceFacts(activeHarpStrata)
  const expectedOctaveGroups = [[0, 1, 2], [3, 4, 5], [6, 7, 8], [9]]

  expect(octaveColumnGroups).toStrictEqual(expectedOctaveGroups)
})
