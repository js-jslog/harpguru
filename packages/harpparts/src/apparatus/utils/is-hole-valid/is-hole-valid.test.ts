import type { Hole } from '../../types'

import { isHoleValid, HoleErrors } from './is-hole-valid'

test('isHoleValid returns no errors with no bends', () => {
  const hole: Hole = {
    blow: 0,
    draw: 1,
    bends: [],
    blowbends: [],
    overblows: [],
    overdraws: [],
  }
  expect(isHoleValid(hole)).toStrictEqual([])
})

test('isHoleValid returns no errors when blowbends and overdraws are both available', () => {
  const hole: Hole = {
    blow: 0,
    draw: 1,
    bends: [],
    blowbends: [1],
    overblows: [],
    overdraws: [1],
  }
  expect(isHoleValid(hole)).toStrictEqual([])
})

test('isHoleValid returns no errors when bends and overblows are both available', () => {
  const hole: Hole = {
    blow: 0,
    draw: 1,
    bends: [1],
    blowbends: [],
    overblows: [1],
    overdraws: [],
  }
  expect(isHoleValid(hole)).toStrictEqual([])
})

test('isHoleValid returns an error when bends and overdraws are both available', () => {
  const hole: Hole = {
    blow: 0,
    draw: 1,
    bends: [1],
    blowbends: [],
    overblows: [],
    overdraws: [1],
  }
  expect(isHoleValid(hole)).toStrictEqual([HoleErrors.ConflictingDrawBends])
})

test('isHoleValid returns an error when blowbends and overblows are both available', () => {
  const hole: Hole = {
    blow: 0,
    draw: 1,
    bends: [],
    blowbends: [1],
    overblows: [1],
    overdraws: [],
  }
  expect(isHoleValid(hole)).toStrictEqual([HoleErrors.ConflictingBlowBends])
})

test('isHoleValid returns no errors when there are 5 bends on a hole', () => {
  const hole: Hole = {
    blow: 0,
    draw: 6,
    bends: [1, 2, 3, 4, 5],
    blowbends: [],
    overblows: [],
    overdraws: [],
  }
  expect(isHoleValid(hole)).toStrictEqual([])
})

test('isHoleValid returns an error when there are more than 5 bends on a hole', () => {
  const hole: Hole = {
    blow: 0,
    draw: 7,
    bends: [1, 2, 3, 4, 5, 6],
    blowbends: [],
    overblows: [],
    overdraws: [],
  }
  expect(isHoleValid(hole)).toStrictEqual([HoleErrors.TooManyBends])
})
