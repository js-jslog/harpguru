import type { Hole } from '../../types'

import { isHoleValid, HoleErrors } from './is-hole-valid'

test('isHoleValid returns no errors with no bends', () => {
  const hole: Hole = {
    blow: 0,
    draw: 1,
    blowbends: [],
    bends: [],
    overblows: [],
    overdraws: [],
    valvedblows: [],
    valveddraws: [],
  }
  expect(isHoleValid(hole)).toStrictEqual([])
})

test('isHoleValid returns no errors when blowbends and overdraws are both available', () => {
  const hole: Hole = {
    blow: 3,
    draw: 1,
    blowbends: [2],
    bends: [],
    overblows: [],
    overdraws: [4],
    valvedblows: [],
    valveddraws: [],
  }
  expect(isHoleValid(hole)).toStrictEqual([])
})

test('isHoleValid returns no errors when bends and overblows are both available', () => {
  const hole: Hole = {
    blow: 1,
    draw: 3,
    blowbends: [],
    bends: [2],
    overblows: [4],
    overdraws: [],
    valvedblows: [],
    valveddraws: [],
  }
  expect(isHoleValid(hole)).toStrictEqual([])
})

test('isHoleValid returns an error when bends and overdraws are both available', () => {
  const hole: Hole = {
    blow: 1,
    draw: 3,
    blowbends: [],
    bends: [2],
    overblows: [],
    overdraws: [2],
    valvedblows: [],
    valveddraws: [],
  }
  expect(isHoleValid(hole)).toStrictEqual([HoleErrors.ConflictingDrawBends])
})

test('isHoleValid returns an error when blowbends and overblows are both available', () => {
  const hole: Hole = {
    blow: 3,
    draw: 1,
    blowbends: [2],
    bends: [],
    overblows: [2],
    overdraws: [],
    valvedblows: [],
    valveddraws: [],
  }
  expect(isHoleValid(hole)).toStrictEqual([HoleErrors.ConflictingBlowBends])
})

test('isHoleValid returns no errors when there are 5 bends on a hole', () => {
  const hole: Hole = {
    blow: 0,
    draw: 6,
    blowbends: [],
    bends: [1, 2, 3, 4, 5],
    overblows: [],
    overdraws: [],
    valvedblows: [],
    valveddraws: [],
  }
  expect(isHoleValid(hole)).toStrictEqual([])
})

test('isHoleValid returns an error when there are more than 5 bends on a hole', () => {
  const hole: Hole = {
    blow: 0,
    draw: 7,
    blowbends: [],
    bends: [1, 2, 3, 4, 5, 6],
    overblows: [],
    overdraws: [],
    valvedblows: [],
    valveddraws: [],
  }
  expect(isHoleValid(hole)).toStrictEqual([HoleErrors.TooManyBends])
})

test('isHoleValid returns no errors when there are 5 blowbends on a hole', () => {
  const hole: Hole = {
    blow: 6,
    draw: 0,
    blowbends: [1, 2, 3, 4, 5],
    bends: [],
    overblows: [],
    overdraws: [],
    valvedblows: [],
    valveddraws: [],
  }
  expect(isHoleValid(hole)).toStrictEqual([])
})

test('isHoleValid returns an error when there are more than 5 blowbends on a hole', () => {
  const hole: Hole = {
    blow: 7,
    draw: 0,
    blowbends: [1, 2, 3, 4, 5, 6],
    bends: [],
    overblows: [],
    overdraws: [],
    valvedblows: [],
    valveddraws: [],
  }
  expect(isHoleValid(hole)).toStrictEqual([HoleErrors.TooManyBlowbends])
})

test('isHoleValid returns no errors when there are 2 overblows on a hole', () => {
  const hole: Hole = {
    blow: 0,
    draw: 2,
    blowbends: [],
    bends: [],
    overblows: [3, 4],
    overdraws: [],
    valvedblows: [],
    valveddraws: [],
  }
  expect(isHoleValid(hole)).toStrictEqual([])
})

test('isHoleValid returns an error when there are more than 2 overblows on a hole', () => {
  const hole: Hole = {
    blow: 0,
    draw: 2,
    blowbends: [],
    bends: [],
    overblows: [3, 4, 5],
    overdraws: [],
    valvedblows: [],
    valveddraws: [],
  }
  expect(isHoleValid(hole)).toStrictEqual([HoleErrors.TooManyOverblows])
})

test('isHoleValid returns no errors when there are 2 overdraws on a hole', () => {
  const hole: Hole = {
    blow: 2,
    draw: 0,
    blowbends: [],
    bends: [],
    overblows: [],
    overdraws: [3, 4],
    valvedblows: [],
    valveddraws: [],
  }
  expect(isHoleValid(hole)).toStrictEqual([])
})

test('isHoleValid returns an error when there are more than 2 overdraws on a hole', () => {
  const hole: Hole = {
    blow: 2,
    draw: 0,
    blowbends: [],
    bends: [],
    overblows: [],
    overdraws: [3, 4, 5],
    valvedblows: [],
    valveddraws: [],
  }
  expect(isHoleValid(hole)).toStrictEqual([HoleErrors.TooManyOverdraws])
})

test('isHoleValid returns no errors when all the bends are consecutively ascending', () => {
  const hole: Hole = {
    blow: 0,
    draw: 4,
    blowbends: [],
    bends: [1, 2, 3],
    overblows: [],
    overdraws: [],
    valvedblows: [],
    valveddraws: [],
  }
  expect(isHoleValid(hole)).toStrictEqual([])
})

test('isHoleValid returns an error when the bends are not consecutively ascending', () => {
  const hole: Hole = {
    blow: 0,
    draw: 4,
    blowbends: [],
    bends: [],
    overblows: [],
    overdraws: [],
    valvedblows: [],
    valveddraws: [],
  }
  expect(isHoleValid({ ...hole, bends: [2, 1, 0] })).toStrictEqual([
    HoleErrors.NonconsecutiveBends,
  ])
  expect(isHoleValid({ ...hole, bends: [1, 1, 3] })).toStrictEqual([
    HoleErrors.NonconsecutiveBends,
  ])
  expect(isHoleValid({ ...hole, bends: [1, 2, 1] })).toStrictEqual([
    HoleErrors.NonconsecutiveBends,
  ])
})

test('isHoleValid returns no errors when all the blowbends are consecutively ascending', () => {
  const hole: Hole = {
    blow: 4,
    draw: 0,
    blowbends: [1, 2, 3],
    bends: [],
    overblows: [],
    overdraws: [],
    valvedblows: [],
    valveddraws: [],
  }
  expect(isHoleValid(hole)).toStrictEqual([])
})

test('isHoleValid returns an error when the blowbends are not consecutively ascending', () => {
  const hole: Hole = {
    blow: 4,
    draw: 0,
    blowbends: [],
    bends: [],
    overblows: [],
    overdraws: [],
    valvedblows: [],
    valveddraws: [],
  }
  expect(isHoleValid({ ...hole, blowbends: [2, 1, 0] })).toStrictEqual([
    HoleErrors.NonconsecutiveBlowbends,
  ])
  expect(isHoleValid({ ...hole, blowbends: [1, 1, 3] })).toStrictEqual([
    HoleErrors.NonconsecutiveBlowbends,
  ])
  expect(isHoleValid({ ...hole, blowbends: [1, 2, 1] })).toStrictEqual([
    HoleErrors.NonconsecutiveBlowbends,
  ])
})

test('isHoleValid returns no errors when all the overblows are consecutively ascending', () => {
  const hole: Hole = {
    blow: 0,
    draw: 4,
    blowbends: [],
    bends: [],
    overblows: [5, 6],
    overdraws: [],
    valvedblows: [],
    valveddraws: [],
  }
  expect(isHoleValid(hole)).toStrictEqual([])
})

test('isHoleValid returns an error when the overblows are not consecutively ascending', () => {
  const hole: Hole = {
    blow: 0,
    draw: 4,
    blowbends: [],
    bends: [],
    overblows: [],
    overdraws: [],
    valvedblows: [],
    valveddraws: [],
  }
  expect(isHoleValid({ ...hole, overblows: [6, 5] })).toStrictEqual([
    HoleErrors.NonconsecutiveOverblows,
  ])
  expect(isHoleValid({ ...hole, overblows: [5, 7] })).toStrictEqual([
    HoleErrors.NonconsecutiveOverblows,
  ])
})

test('isHoleValid returns no errors when all the overdraws are consecutively ascending', () => {
  const hole: Hole = {
    blow: 4,
    draw: 0,
    blowbends: [],
    bends: [],
    overblows: [],
    overdraws: [5, 6],
    valvedblows: [],
    valveddraws: [],
  }
  expect(isHoleValid(hole)).toStrictEqual([])
})

test('isHoleValid returns an error when there are valved blow bends along with sympathetic blow bends', () => {
  const hole: Hole = {
    blow: 4,
    draw: 0,
    blowbends: [],
    bends: [],
    overblows: [],
    overdraws: [],
    valvedblows: [],
    valveddraws: [],
  }
  expect(
    isHoleValid({ ...hole, blowbends: [1, 2, 3], valvedblows: [3] })
  ).toStrictEqual([HoleErrors.ConflictingValvedBlowBends])
  // Strictly this hole doesn't make sense because an overblow would not exist on it,
  // but it serves the purpose
  expect(
    isHoleValid({ ...hole, overblows: [1], valvedblows: [3] })
  ).toStrictEqual([HoleErrors.ConflictingValvedBlowBends])
})

test('isHoleValid returns an error when there are valved draw bends along with sympathetic draw bends', () => {
  const hole: Hole = {
    blow: 0,
    draw: 4,
    blowbends: [],
    bends: [],
    overblows: [],
    overdraws: [],
    valvedblows: [],
    valveddraws: [],
  }
  expect(
    isHoleValid({ ...hole, bends: [1, 2, 3], valveddraws: [3] })
  ).toStrictEqual([HoleErrors.ConflictingValvedDrawBends])
  // Strictly this hole doesn't make sense because an overdraw would not exist on it,
  // but it serves the purpose
  expect(
    isHoleValid({ ...hole, overdraws: [1], valveddraws: [3] })
  ).toStrictEqual([HoleErrors.ConflictingValvedDrawBends])
})
