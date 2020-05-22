import { exampleHarpFaceProps } from '../../HarpFace'

import { getHoleNumbers } from './index'

test('getHoleNumbers returns an array of HoleNumber components which is the width of the harmonica face', () => {
  const { activeHarpStrata: { degreeMatrix }} = exampleHarpFaceProps
  const [ { length: columnCount } ] = degreeMatrix
  const holeNumbers = getHoleNumbers(exampleHarpFaceProps)

  expect(holeNumbers.length).toBe(columnCount)
})
