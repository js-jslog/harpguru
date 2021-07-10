import { inactiveCellsHarpStrata as activeHarpStrata } from '../../../../test-resources'

import { getHarpRows } from './get-harp-rows'

test('getHarpRows returns an object with the rows split between the blow / draw holes', () => {
  const xRange = [0, 1, 2]
  const holeRows = getHarpRows(xRange, activeHarpStrata)
  expect(holeRows.top.length).toBe(3)
  expect(holeRows.bottom.length).toBe(4)
})
