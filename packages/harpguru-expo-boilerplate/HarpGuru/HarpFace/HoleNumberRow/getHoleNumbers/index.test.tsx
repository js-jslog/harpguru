import { harpFaceProps } from '../../testResources'

import { getHoleNumbers } from './index'

test('getHoleNumbers returns an array of HoleNumber components which is the width of the harmonica face', () => {
  const {
    activeHarpStrata: { degreeMatrix },
  } = harpFaceProps
  const [{ length: columnCount }] = degreeMatrix
  const holeNumbers = getHoleNumbers(harpFaceProps)

  expect(holeNumbers.length).toBe(columnCount)
})
