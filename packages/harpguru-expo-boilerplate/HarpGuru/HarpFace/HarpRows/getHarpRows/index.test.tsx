import { harpFaceProps } from '../../testResources'

import { getHarpRows } from './index'

test('getHarpRows returns an object with the major diatonic rows split between the blow / draw holes', () => {
  const holeRows = getHarpRows(harpFaceProps)
  expect(holeRows.top.length).toBe(3)
  expect(holeRows.bottom.length).toBe(4)
})
