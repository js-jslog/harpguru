import type { ReedPairArray } from '../../types'
import type { ReedArray } from '../../../tuning'

import { pivotReedArray } from './pivot-reed-array'

test('pivotReedArray pivots a 10 reed ReedArray to a ReedPairArray', () => {
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

test('pivotReedArray pivots a 7 reed ReedArray to a ReedPairArray', () => {
  const reedArray: ReedArray = [
    [0, 0, 0, 0, 0, 0, 0],
    [1, 1, 1, 1, 1, 1, 1],
  ]
  const expectedOutput: ReedPairArray = [
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
