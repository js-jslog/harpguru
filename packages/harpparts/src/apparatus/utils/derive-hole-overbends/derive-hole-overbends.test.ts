import type { Hole } from '../../types'

import { deriveHoleOverbends } from './derive-hole-overbends'

test('deriveHoleOverbends adds an overblow', () => {
  const holeInput: Hole = {
    blow: 9,
    draw: 10,
    bends: [],
    blowBends: [],
    overblows: [],
    overdraws: [],
  }

  const expectedHoleOutput: Hole = {
    ...holeInput,
    overblows: [11],
  }
  const actualHoleOutput = deriveHoleOverbends(holeInput)

  expect(actualHoleOutput).toStrictEqual(expectedHoleOutput)
})

test('deriveHoleOverbends adds an overdraw', () => {
  const holeInput: Hole = {
    blow: 1,
    draw: 0,
    bends: [],
    blowBends: [],
    overblows: [],
    overdraws: [],
  }

  const expectedHoleOutput: Hole = {
    ...holeInput,
    overdraws: [2],
  }
  const actualHoleOutput = deriveHoleOverbends(holeInput)

  expect(actualHoleOutput).toStrictEqual(expectedHoleOutput)
})

// This behaviour may not actually be correct, but I'm waiting for Woozle to do
// an experiment to confirm whether overbends occur in this situation.
test('deriveHoleOverbends adds no overbends when the reeds are the same', () => {
  const holeInput: Hole = {
    blow: 8,
    draw: 8,
    bends: [],
    blowBends: [],
    overblows: [],
    overdraws: [],
  }

  const actualHoleOutput = deriveHoleOverbends(holeInput)

  expect(actualHoleOutput).toStrictEqual(holeInput)
})
