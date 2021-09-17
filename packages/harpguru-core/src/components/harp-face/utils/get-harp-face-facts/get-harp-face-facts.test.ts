import { inactiveCellsHarpStrata as activeHarpStrata } from '../../../../test-resources'

import { getHarpFaceFacts } from './index'

test('Recovers the column and row count from the HarpFaceProps', () => {
  const harpFaceFacts = getHarpFaceFacts(activeHarpStrata)

  const { columnCount, rowCount } = harpFaceFacts

  expect(columnCount).toBe(10)
  expect(rowCount).toBe(7)
})

test('Identifies the columns grouped by octave', () => {
  const { octaveColumnGroups } = getHarpFaceFacts(activeHarpStrata)
  const expectedOctaveGroups = [[0, 1, 2], [3, 4, 5], [6, 7, 8], [9]]

  expect(octaveColumnGroups).toStrictEqual(expectedOctaveGroups)
})
