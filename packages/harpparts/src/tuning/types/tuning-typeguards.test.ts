import type {
  ReedArray7,
  ReedArray10,
  ReedArray12,
  ReedArray13,
  ReedArray16,
} from './tuning-types'
import {
  isReedArray7,
  isReedArray10,
  isReedArray12,
  isReedArray13,
  isReedArray16,
} from './tuning-typeguards'

const reedArray7: ReedArray7 = [
  [1, 2, 3, 4, 5, 6, 7],
  [1, 2, 3, 4, 5, 6, 7],
]
const reedArray10: ReedArray10 = [
  [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
  [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
]

const reedArray12: ReedArray12 = [
  [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
  [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
]

const reedArray13: ReedArray13 = [
  [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13],
  [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13],
]

const reedArray16: ReedArray16 = [
  [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16],
  [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16],
]

test('isReedArray7 returns true for a 7 reed array and false otherwise', () => {
  expect(isReedArray7(reedArray7)).toBeTruthy()
  expect(isReedArray7(reedArray10)).toBeFalsy()
  expect(isReedArray7(reedArray12)).toBeFalsy()
  expect(isReedArray7(reedArray13)).toBeFalsy()
  expect(isReedArray7(reedArray16)).toBeFalsy()
})

test('isReedArray10 returns true for a 10 reed array and false otherwise', () => {
  expect(isReedArray10(reedArray7)).toBeFalsy()
  expect(isReedArray10(reedArray10)).toBeTruthy()
  expect(isReedArray10(reedArray12)).toBeFalsy()
  expect(isReedArray10(reedArray13)).toBeFalsy()
  expect(isReedArray10(reedArray16)).toBeFalsy()
})

test('isReedArray12 returns true for a 12 reed array and false otherwise', () => {
  expect(isReedArray12(reedArray7)).toBeFalsy()
  expect(isReedArray12(reedArray10)).toBeFalsy()
  expect(isReedArray12(reedArray12)).toBeTruthy()
  expect(isReedArray12(reedArray13)).toBeFalsy()
  expect(isReedArray12(reedArray16)).toBeFalsy()
})

test('isReedArray13 returns true for a 13 reed array and false otherwise', () => {
  expect(isReedArray13(reedArray7)).toBeFalsy()
  expect(isReedArray13(reedArray10)).toBeFalsy()
  expect(isReedArray13(reedArray12)).toBeFalsy()
  expect(isReedArray13(reedArray13)).toBeTruthy()
  expect(isReedArray13(reedArray16)).toBeFalsy()
})

test('isReedArray16 returns true for a 16 reed array and false otherwise', () => {
  expect(isReedArray16(reedArray7)).toBeFalsy()
  expect(isReedArray16(reedArray10)).toBeFalsy()
  expect(isReedArray16(reedArray12)).toBeFalsy()
  expect(isReedArray16(reedArray13)).toBeFalsy()
  expect(isReedArray16(reedArray16)).toBeTruthy()
})
