import { exampleHarpFaceProps } from '../HarpFace'

import { HarpRows } from './index'

test('HarpRows returns an object with the major diatonic rows split between the blow / draw holes', () => {
  const holeRows = HarpRows(exampleHarpFaceProps)
  expect(holeRows.top.length).toBe(3)
  expect(holeRows.bottom.length).toBe(4)
})
