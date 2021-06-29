import type { Hole } from '../../types'
import { ValvingIds } from '../../../valving'

import { mapHoleToIncludeOverbends } from './map-hole-to-include-overbends'

test('mapHoleToIncludeOverbends adds an overblow', () => {
  const holeInput: Hole = {
    blow: 9,
    draw: 10,
    blowbends: [],
    drawbends: [],
    overblows: [],
    overdraws: [],
    valvedblows: [],
    valveddraws: [],
  }

  const expectedHoleOutput: Hole = {
    ...holeInput,
    overblows: [11],
  }
  const actualHoleOutput = mapHoleToIncludeOverbends(
    ValvingIds.NotValved,
    holeInput
  )

  expect(actualHoleOutput).toStrictEqual(expectedHoleOutput)
})

test('mapHoleToIncludeOverbends adds an overdraw', () => {
  const holeInput: Hole = {
    blow: 1,
    draw: 0,
    blowbends: [],
    drawbends: [],
    overblows: [],
    overdraws: [],
    valvedblows: [],
    valveddraws: [],
  }

  const expectedHoleOutput: Hole = {
    ...holeInput,
    overdraws: [2],
  }
  const actualHoleOutput = mapHoleToIncludeOverbends(
    ValvingIds.NotValved,
    holeInput
  )

  expect(actualHoleOutput).toStrictEqual(expectedHoleOutput)
})

test('mapHoleToIncludeOverbends adds no overblow when the hole is halfvalved', () => {
  const holeInput: Hole = {
    blow: 9,
    draw: 10,
    blowbends: [],
    drawbends: [],
    overblows: [],
    overdraws: [],
    valvedblows: [],
    valveddraws: [],
  }
  const actualHoleOutput = mapHoleToIncludeOverbends(
    ValvingIds.HalfValved,
    holeInput
  )

  expect(actualHoleOutput).toStrictEqual(holeInput)
})

test('mapHoleToIncludeOverbends adds no overdraw when the hole is halfvalved', () => {
  const holeInput: Hole = {
    blow: 1,
    draw: 0,
    blowbends: [],
    drawbends: [],
    overblows: [],
    overdraws: [],
    valvedblows: [],
    valveddraws: [],
  }

  const actualHoleOutput = mapHoleToIncludeOverbends(
    ValvingIds.HalfValved,
    holeInput
  )

  expect(actualHoleOutput).toStrictEqual(holeInput)
})

// This behaviour may not actually be correct, but I'm waiting for Woozle to do
// an experiment to confirm whether overbends occur in this situation.
test('mapHoleToIncludeOverbends adds no overbends when the reeds are the same', () => {
  const holeInput: Hole = {
    blow: 8,
    draw: 8,
    blowbends: [],
    drawbends: [],
    overblows: [],
    overdraws: [],
    valvedblows: [],
    valveddraws: [],
  }

  const actualHoleOutput = mapHoleToIncludeOverbends(
    ValvingIds.NotValved,
    holeInput
  )

  expect(actualHoleOutput).toStrictEqual(holeInput)
})
