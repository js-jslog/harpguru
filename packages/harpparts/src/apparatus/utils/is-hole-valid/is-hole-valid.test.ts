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
    blow: 3,
    draw: 1,
    bends: [],
    blowbends: [2],
    overblows: [],
    overdraws: [4],
  }
  expect(isHoleValid(hole)).toStrictEqual([])
})

test('isHoleValid returns no errors when bends and overblows are both available', () => {
  const hole: Hole = {
    blow: 1,
    draw: 3,
    bends: [2],
    blowbends: [],
    overblows: [4],
    overdraws: [],
  }
  expect(isHoleValid(hole)).toStrictEqual([])
})

test('isHoleValid returns an error when bends and overdraws are both available', () => {
  const hole: Hole = {
    blow: 1,
    draw: 3,
    bends: [2],
    blowbends: [],
    overblows: [],
    overdraws: [2],
  }
  expect(isHoleValid(hole)).toStrictEqual([HoleErrors.ConflictingDrawBends])
})

test('isHoleValid returns an error when blowbends and overblows are both available', () => {
  const hole: Hole = {
    blow: 3,
    draw: 1,
    bends: [],
    blowbends: [2],
    overblows: [2],
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

test('isHoleValid returns no errors when there are 5 blowbends on a hole', () => {
  const hole: Hole = {
    blow: 6,
    draw: 0,
    bends: [],
    blowbends: [1, 2, 3, 4, 5],
    overblows: [],
    overdraws: [],
  }
  expect(isHoleValid(hole)).toStrictEqual([])
})

test('isHoleValid returns an error when there are more than 5 blowbends on a hole', () => {
  const hole: Hole = {
    blow: 7,
    draw: 0,
    bends: [],
    blowbends: [1, 2, 3, 4, 5, 6],
    overblows: [],
    overdraws: [],
  }
  expect(isHoleValid(hole)).toStrictEqual([HoleErrors.TooManyBlowbends])
})

test('isHoleValid returns no errors when there are 2 overblows on a hole', () => {
  const hole: Hole = {
    blow: 0,
    draw: 2,
    bends: [],
    blowbends: [],
    overblows: [3, 4],
    overdraws: [],
  }
  expect(isHoleValid(hole)).toStrictEqual([])
})

test('isHoleValid returns an error when there are more than 2 overblows on a hole', () => {
  const hole: Hole = {
    blow: 0,
    draw: 2,
    bends: [],
    blowbends: [],
    overblows: [3, 4, 5],
    overdraws: [],
  }
  expect(isHoleValid(hole)).toStrictEqual([HoleErrors.TooManyOverblows])
})

test('isHoleValid returns no errors when there are 2 overdraws on a hole', () => {
  const hole: Hole = {
    blow: 2,
    draw: 0,
    bends: [],
    blowbends: [],
    overblows: [],
    overdraws: [3, 4],
  }
  expect(isHoleValid(hole)).toStrictEqual([])
})

test('isHoleValid returns an error when there are more than 2 overdraws on a hole', () => {
  const hole: Hole = {
    blow: 2,
    draw: 0,
    bends: [],
    blowbends: [],
    overblows: [],
    overdraws: [3, 4, 5],
  }
  expect(isHoleValid(hole)).toStrictEqual([HoleErrors.TooManyOverdraws])
})
