import type { ReedPairArray } from '../../types'
import type { ReedArray } from '../../../tuning'

import { pivotReedArray } from './pivot-reed-array'

test('pivotReedArray pivots a 7 reed ReedArray to a ReedPairArray', () => {
  const reedArray: ReedArray = [
    [0, 1, 2, 3, 4, 5, 6],
    [1, 2, 3, 4, 5, 6, 7],
  ]
  const expectedOutput: ReedPairArray = [
    [0, 1],
    [1, 2],
    [2, 3],
    [3, 4],
    [4, 5],
    [5, 6],
    [6, 7],
  ]

  expect(pivotReedArray(reedArray)).toStrictEqual(expectedOutput)
})

test('pivotReedArray pivots a 10 reed ReedArray to a ReedPairArray', () => {
  const reedArray: ReedArray = [
    [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
    [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
  ]
  const expectedOutput: ReedPairArray = [
    [0, 1],
    [1, 2],
    [2, 3],
    [3, 4],
    [4, 5],
    [5, 6],
    [6, 7],
    [7, 8],
    [8, 9],
    [9, 10],
  ]

  expect(pivotReedArray(reedArray)).toStrictEqual(expectedOutput)
})

test('pivotReedArray pivots a 12 reed ReedArray to a ReedPairArray', () => {
  const reedArray: ReedArray = [
    [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11],
    [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
  ]
  const expectedOutput: ReedPairArray = [
    [0, 1],
    [1, 2],
    [2, 3],
    [3, 4],
    [4, 5],
    [5, 6],
    [6, 7],
    [7, 8],
    [8, 9],
    [9, 10],
    [10, 11],
    [11, 12],
  ]

  expect(pivotReedArray(reedArray)).toStrictEqual(expectedOutput)
})

test('pivotReedArray pivots a 13 reed ReedArray to a ReedPairArray', () => {
  const reedArray: ReedArray = [
    [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
    [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13],
  ]
  const expectedOutput: ReedPairArray = [
    [0, 1],
    [1, 2],
    [2, 3],
    [3, 4],
    [4, 5],
    [5, 6],
    [6, 7],
    [7, 8],
    [8, 9],
    [9, 10],
    [10, 11],
    [11, 12],
    [12, 13],
  ]

  expect(pivotReedArray(reedArray)).toStrictEqual(expectedOutput)
})

test('pivotReedArray pivots a 16 reed ReedArray to a ReedPairArray', () => {
  const reedArray: ReedArray = [
    [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15],
    [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16],
  ]
  const expectedOutput: ReedPairArray = [
    [0, 1],
    [1, 2],
    [2, 3],
    [3, 4],
    [4, 5],
    [5, 6],
    [6, 7],
    [7, 8],
    [8, 9],
    [9, 10],
    [10, 11],
    [11, 12],
    [12, 13],
    [13, 14],
    [14, 15],
    [15, 16],
  ]

  expect(pivotReedArray(reedArray)).toStrictEqual(expectedOutput)
})
