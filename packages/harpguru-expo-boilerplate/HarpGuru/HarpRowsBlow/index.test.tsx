import { exampleHarpFaceProps } from '../HarpFace'

import { HoleRowsBlow } from './index'

test('HoleRowsBlow returns an array of 3 HoleRow elements for a major diatonic harp', () => {
  const holeRowsBlow = HoleRowsBlow(exampleHarpFaceProps)
  expect(holeRowsBlow.length).toBe(3)
})
