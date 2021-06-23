import type { Hole } from '../../types'

import { mapHoleToIncludeValvebends } from './map-hole-to-include-valvebends'

test('mapHoleToIncludeValvebends adds a valved blow bend when the blow reed is lower', () => {
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
    valvedblows: [8],
  }
  const actualHoleOutput = mapHoleToIncludeValvebends(holeInput)

  expect(actualHoleOutput).toStrictEqual(expectedHoleOutput)
})

test('mapHoleToIncludeValvebends adds a valved draw bend when draw reed is lower', () => {
  const holeInput: Hole = {
    blow: 10,
    draw: 9,
    bends: [],
    blowbends: [],
    overblows: [],
    overdraws: [],
    valvedblows: [],
    valveddraws: [],
  }

  const expectedHoleOutput: Hole = {
    ...holeInput,
    valveddraws: [8],
  }
  const actualHoleOutput = mapHoleToIncludeValvebends(holeInput)

  expect(actualHoleOutput).toStrictEqual(expectedHoleOutput)
})

// The way I see it, if you're halfvalving normally but your hole would have no bends
// for the unvalved reed then you might as well go full valved.
// This is an edge case anyway.
test('mapHoleToIncludeValvebends adds both a valved blow and a valved draw bend when the reeds are the same', () => {
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

  const expectedHoleOutput: Hole = {
    ...holeInput,
    valvedblows: [7],
    valveddraws: [7],
  }
  const actualHoleOutput = mapHoleToIncludeValvebends(holeInput)

  expect(actualHoleOutput).toStrictEqual(expectedHoleOutput)
})

test('mapHoleToIncludeValvebends adds a valvebend when the blow reed is 0', () => {
  const holeInput: Hole = {
    blow: 0,
    draw: 2,
    bends: [],
    blowbends: [],
    overblows: [],
    overdraws: [],
    valvedblows: [],
    valveddraws: [],
  }

  const expectedHoleOutput: Hole = {
    ...holeInput,
    valvedblows: [-1],
  }
  const actualHoleOutput = mapHoleToIncludeValvebends(holeInput)

  expect(actualHoleOutput).toStrictEqual(expectedHoleOutput)
})
