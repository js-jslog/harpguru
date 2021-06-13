import type { Hole } from '../../types'

import { isHoleValid } from './is-hole-valid'

test('isHoleValid returns true with no bends', () => {
  const hole: Hole = {
    blow: 0,
    draw: 1,
    bends: [],
    blowbends: [],
    overblows: [],
    overdraws: [],
  }
  expect(isHoleValid(hole)).toBeTruthy()
})

test('isHoleValid returns true when blowbends and overdraws are both available', () => {
  const hole: Hole = {
    blow: 0,
    draw: 1,
    bends: [],
    blowbends: [1],
    overblows: [],
    overdraws: [1],
  }
  expect(isHoleValid(hole)).toBeTruthy()
})

test('isHoleValid returns true when bends and overblows are both available', () => {
  const hole: Hole = {
    blow: 0,
    draw: 1,
    bends: [1],
    blowbends: [],
    overblows: [1],
    overdraws: [],
  }
  expect(isHoleValid(hole)).toBeTruthy()
})

test('isHoleValid returns false when bends and overdraws are both available', () => {
  const hole: Hole = {
    blow: 0,
    draw: 1,
    bends: [1],
    blowbends: [],
    overblows: [],
    overdraws: [1],
  }
  expect(isHoleValid(hole)).toBeFalsy()
})

test('isHoleValid returns false when blowbends and overblows are both available', () => {
  const hole: Hole = {
    blow: 0,
    draw: 1,
    bends: [],
    blowbends: [1],
    overblows: [1],
    overdraws: [],
  }
  expect(isHoleValid(hole)).toBeFalsy()
})
