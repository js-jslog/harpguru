import type { Hole } from '../../types'

import { mapHoleToIncludeValvebends } from './map-hole-to-include-valvebends'

test('mapHoleToIncludeValvebends adds a valvebend when draw is higher than blow', () => {
  const holeInput: Hole = {
    blow: 9,
    draw: 10,
    bends: [],
    blowbends: [],
    valvebends: [],
    overblows: [],
    overdraws: [],
  }

  const expectedHoleOutput: Hole = {
    ...holeInput,
    valvebends: [8],
  }
  const actualHoleOutput = mapHoleToIncludeValvebends(holeInput)

  expect(actualHoleOutput).toStrictEqual(expectedHoleOutput)
})

test('mapHoleToIncludeValvebends adds a valvebend when blow is higher than draw', () => {
  const holeInput: Hole = {
    blow: 1,
    draw: 0,
    bends: [],
    blowbends: [],
    valvebends: [],
    overblows: [],
    overdraws: [],
  }

  const expectedHoleOutput: Hole = {
    ...holeInput,
    valvebends: [0],
  }
  const actualHoleOutput = mapHoleToIncludeValvebends(holeInput)

  expect(actualHoleOutput).toStrictEqual(expectedHoleOutput)
})

test('mapHoleToIncludeValvebends adds a valvebend when the reeds are the same', () => {
  const holeInput: Hole = {
    blow: 8,
    draw: 8,
    bends: [],
    blowbends: [],
    valvebends: [],
    overblows: [],
    overdraws: [],
  }

  const expectedHoleOutput: Hole = {
    ...holeInput,
    valvebends: [7],
  }
  const actualHoleOutput = mapHoleToIncludeValvebends(holeInput)

  expect(actualHoleOutput).toStrictEqual(expectedHoleOutput)
})

test('mapHoleToIncludeValvebends adds a valvebend when the blow reed is 0', () => {
  const holeInput: Hole = {
    blow: 0,
    draw: 1,
    bends: [],
    blowbends: [],
    valvebends: [],
    overblows: [],
    overdraws: [],
  }

  const expectedHoleOutput: Hole = {
    ...holeInput,
    valvebends: [-1],
  }
  const actualHoleOutput = mapHoleToIncludeValvebends(holeInput)

  expect(actualHoleOutput).toStrictEqual(expectedHoleOutput)
})
