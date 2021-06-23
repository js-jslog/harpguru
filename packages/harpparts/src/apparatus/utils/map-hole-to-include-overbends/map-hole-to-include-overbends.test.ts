import type { Hole } from '../../types'

import { mapHoleToIncludeOverbends } from './map-hole-to-include-overbends'

test('mapHoleToIncludeOverbends adds an overblow', () => {
  const holeInput: Hole = {
    blow: 9,
    draw: 10,
    bends: [],
    blowbends: [],
    overblows: [],
    overdraws: [],
    valvedblows: [],
    valveddraws: [],
  }

  const expectedHoleOutput: Hole = {
    ...holeInput,
    overblows: [11],
  }
  const actualHoleOutput = mapHoleToIncludeOverbends(holeInput)

  expect(actualHoleOutput).toStrictEqual(expectedHoleOutput)
})

test('mapHoleToIncludeOverbends adds an overdraw', () => {
  const holeInput: Hole = {
    blow: 1,
    draw: 0,
    bends: [],
    blowbends: [],
    overblows: [],
    overdraws: [],
    valvedblows: [],
    valveddraws: [],
  }

  const expectedHoleOutput: Hole = {
    ...holeInput,
    overdraws: [2],
  }
  const actualHoleOutput = mapHoleToIncludeOverbends(holeInput)

  expect(actualHoleOutput).toStrictEqual(expectedHoleOutput)
})

// This behaviour may not actually be correct, but I'm waiting for Woozle to do
// an experiment to confirm whether overbends occur in this situation.
test('mapHoleToIncludeOverbends adds no overbends when the reeds are the same', () => {
  const holeInput: Hole = {
    blow: 8,
    draw: 8,
    bends: [],
    blowbends: [],
    overblows: [],
    overdraws: [],
    valvedblows: [],
    valveddraws: [],
  }

  const actualHoleOutput = mapHoleToIncludeOverbends(holeInput)

  expect(actualHoleOutput).toStrictEqual(holeInput)
})
