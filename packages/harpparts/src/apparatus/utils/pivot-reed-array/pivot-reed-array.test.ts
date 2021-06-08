import type { ReedArray, ReedPairArray } from '../../types'

import { pivotReedArray } from './pivot-reed-array'

test('pivotReedArray pivots a simple ReedArray to a ReedPairArray', () => {
  const reedArray: ReedArray = [
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
  ]
  const expectedOutput: ReedPairArray = [
    [0, 1],
    [0, 1],
    [0, 1],
    [0, 1],
    [0, 1],
    [0, 1],
    [0, 1],
    [0, 1],
    [0, 1],
    [0, 1],
  ]

  expect(pivotReedArray(reedArray)).toStrictEqual(expectedOutput)
})
