import type { Hole } from '../../types'

import { mapHoleToIncludeBends } from './map-hole-to-include-bends'

test('mapHoleToIncludeBends adds no bends', () => {
  const holeInput: Hole = {
    blow: 9,
    draw: 10,
    blowbends: [],
    bends: [],
    overblows: [],
    overdraws: [],
    valvedblows: [],
    valveddraws: [],
  }

  const actualHoleOutput = mapHoleToIncludeBends(holeInput)

  expect(actualHoleOutput).toStrictEqual(holeInput)
})

test('mapHoleToIncludeBends adds a simple single bend', () => {
  const holeInput: Hole = {
    blow: 0,
    draw: 2,
    blowbends: [],
    bends: [],
    overblows: [],
    overdraws: [],
    valvedblows: [],
    valveddraws: [],
  }
  const expectedHoleOutput: Hole = {
    blow: 0,
    draw: 2,
    blowbends: [],
    bends: [1],
    overblows: [],
    overdraws: [],
    valvedblows: [],
    valveddraws: [],
  }

  const actualHoleOutput = mapHoleToIncludeBends(holeInput)

  expect(actualHoleOutput).toStrictEqual(expectedHoleOutput)
})

test('mapHoleToIncludeBends adds a triple bend', () => {
  const holeInput: Hole = {
    blow: 25,
    draw: 29,
    blowbends: [],
    bends: [],
    overblows: [],
    overdraws: [],
    valvedblows: [],
    valveddraws: [],
  }
  const expectedHoleOutput: Hole = {
    blow: 25,
    draw: 29,
    blowbends: [],
    bends: [26, 27, 28],
    overblows: [],
    overdraws: [],
    valvedblows: [],
    valveddraws: [],
  }

  const actualHoleOutput = mapHoleToIncludeBends(holeInput)

  expect(actualHoleOutput).toStrictEqual(expectedHoleOutput)
})

test('mapHoleToIncludeBends adds no blow bends', () => {
  const holeInput: Hole = {
    blow: 20,
    draw: 19,
    blowbends: [],
    bends: [],
    overblows: [],
    overdraws: [],
    valvedblows: [],
    valveddraws: [],
  }

  const actualHoleOutput = mapHoleToIncludeBends(holeInput)

  expect(actualHoleOutput).toStrictEqual(holeInput)
})

test('mapHoleToIncludeBends adds a simple single blow bend', () => {
  const holeInput: Hole = {
    blow: 9,
    draw: 11,
    blowbends: [],
    bends: [],
    overblows: [],
    overdraws: [],
    valvedblows: [],
    valveddraws: [],
  }
  const expectedHoleOutput: Hole = {
    blow: 9,
    draw: 11,
    blowbends: [],
    bends: [10],
    overblows: [],
    overdraws: [],
    valvedblows: [],
    valveddraws: [],
  }

  const actualHoleOutput = mapHoleToIncludeBends(holeInput)

  expect(actualHoleOutput).toStrictEqual(expectedHoleOutput)
})

test('mapHoleToIncludeBends adds a triple blow bend', () => {
  const holeInput: Hole = {
    blow: 12,
    draw: 8,
    blowbends: [],
    bends: [],
    overblows: [],
    overdraws: [],
    valvedblows: [],
    valveddraws: [],
  }
  const expectedHoleOutput: Hole = {
    blow: 12,
    draw: 8,
    blowbends: [9, 10, 11],
    bends: [],
    overblows: [],
    overdraws: [],
    valvedblows: [],
    valveddraws: [],
  }

  const actualHoleOutput = mapHoleToIncludeBends(holeInput)

  expect(actualHoleOutput).toStrictEqual(expectedHoleOutput)
})

test('mapHoleToIncludeBends adds no bends on 2 identical reeds', () => {
  const holeInput: Hole = {
    blow: 18,
    draw: 18,
    blowbends: [],
    bends: [],
    overblows: [],
    overdraws: [],
    valvedblows: [],
    valveddraws: [],
  }

  const actualHoleOutput = mapHoleToIncludeBends(holeInput)

  expect(actualHoleOutput).toStrictEqual(holeInput)
})
