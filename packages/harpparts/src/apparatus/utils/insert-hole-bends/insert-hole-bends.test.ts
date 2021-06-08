import type { Hole } from '../../types'

import { insertHoleBends } from './insert-hole-bends'

test('insertHoleBends adds no bends', () => {
  const holeInput: Hole = {
    blow: 9,
    draw: 10,
    bends: [],
    blowbends: [],
    overblows: [],
    overdraws: [],
  }

  const actualHoleOutput = insertHoleBends(holeInput)

  expect(actualHoleOutput).toStrictEqual(holeInput)
})

test('insertHoleBends adds a simple single bend', () => {
  const holeInput: Hole = {
    blow: 0,
    draw: 2,
    bends: [],
    blowbends: [],
    overblows: [],
    overdraws: [],
  }
  const expectedHoleOutput: Hole = {
    blow: 0,
    draw: 2,
    bends: [1],
    blowbends: [],
    overblows: [],
    overdraws: [],
  }

  const actualHoleOutput = insertHoleBends(holeInput)

  expect(actualHoleOutput).toStrictEqual(expectedHoleOutput)
})

test('insertHoleBends adds a triple bend', () => {
  const holeInput: Hole = {
    blow: 25,
    draw: 29,
    bends: [],
    blowbends: [],
    overblows: [],
    overdraws: [],
  }
  const expectedHoleOutput: Hole = {
    blow: 25,
    draw: 29,
    bends: [26, 27, 28],
    blowbends: [],
    overblows: [],
    overdraws: [],
  }

  const actualHoleOutput = insertHoleBends(holeInput)

  expect(actualHoleOutput).toStrictEqual(expectedHoleOutput)
})

test('insertHoleBends adds no blow bends', () => {
  const holeInput: Hole = {
    blow: 20,
    draw: 19,
    bends: [],
    blowbends: [],
    overblows: [],
    overdraws: [],
  }

  const actualHoleOutput = insertHoleBends(holeInput)

  expect(actualHoleOutput).toStrictEqual(holeInput)
})

test('insertHoleBends adds a simple single blow bend', () => {
  const holeInput: Hole = {
    blow: 9,
    draw: 11,
    bends: [],
    blowbends: [],
    overblows: [],
    overdraws: [],
  }
  const expectedHoleOutput: Hole = {
    blow: 9,
    draw: 11,
    bends: [10],
    blowbends: [],
    overblows: [],
    overdraws: [],
  }

  const actualHoleOutput = insertHoleBends(holeInput)

  expect(actualHoleOutput).toStrictEqual(expectedHoleOutput)
})

test('insertHoleBends adds a triple blow bend', () => {
  const holeInput: Hole = {
    blow: 12,
    draw: 8,
    bends: [],
    blowbends: [],
    overblows: [],
    overdraws: [],
  }
  const expectedHoleOutput: Hole = {
    blow: 12,
    draw: 8,
    bends: [],
    blowbends: [9, 10, 11],
    overblows: [],
    overdraws: [],
  }

  const actualHoleOutput = insertHoleBends(holeInput)

  expect(actualHoleOutput).toStrictEqual(expectedHoleOutput)
})

test('insertHoleBends adds no bends on 2 identical reeds', () => {
  const holeInput: Hole = {
    blow: 18,
    draw: 18,
    bends: [],
    blowbends: [],
    overblows: [],
    overdraws: [],
  }

  const actualHoleOutput = insertHoleBends(holeInput)

  expect(actualHoleOutput).toStrictEqual(holeInput)
})
