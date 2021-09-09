import type { ReedArray10, ReedArray7 } from './tuning-types'
import { isReedArray7, isReedArray10 } from './tuning-typeguards'

const reedArray7: ReedArray7 = [
  [1, 2, 3, 4, 5, 6, 7],
  [1, 2, 3, 4, 5, 6, 7],
]
const reedArray10: ReedArray10 = [
  [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
  [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
]

test('isReedArray7 returns true for a 7 reed array and false otherwise', () => {
  expect(isReedArray7(reedArray7)).toBeTruthy()
  expect(isReedArray7(reedArray10)).toBeFalsy()
})

test('isReedArray10 returns true for a 10 reed array and false otherwise', () => {
  expect(isReedArray10(reedArray10)).toBeTruthy()
  expect(isReedArray10(reedArray7)).toBeFalsy()
})
