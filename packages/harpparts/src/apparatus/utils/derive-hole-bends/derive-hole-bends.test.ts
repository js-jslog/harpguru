import type { Hole } from '../../types'

import { deriveHoleBends } from './derive-hole-bends'

test('deriveHoleBends adds no bends', () => {
  const holeInput: Hole = {
    blow: 9,
    draw: 10,
  }

  const actualHoleOutput = deriveHoleBends(holeInput)

  expect(actualHoleOutput).toStrictEqual(holeInput)
})

test('deriveHoleBends adds a simple single bend', () => {
  const holeInput: Hole = {
    blow: 0,
    draw: 2,
  }
  const expectedHoleOutput: Hole = {
    blow: 0,
    draw: 2,
    bends: [1],
  }

  const actualHoleOutput = deriveHoleBends(holeInput)

  expect(actualHoleOutput).toStrictEqual(expectedHoleOutput)
})

test('deriveHoleBends adds a triple bend', () => {
  const holeInput: Hole = {
    blow: 25,
    draw: 29,
  }
  const expectedHoleOutput: Hole = {
    blow: 25,
    draw: 29,
    bends: [26, 27, 28],
  }

  const actualHoleOutput = deriveHoleBends(holeInput)

  expect(actualHoleOutput).toStrictEqual(expectedHoleOutput)
})

test('deriveHoleBends adds no blow bends', () => {
  const holeInput: Hole = {
    blow: 20,
    draw: 19,
  }

  const actualHoleOutput = deriveHoleBends(holeInput)

  expect(actualHoleOutput).toStrictEqual(holeInput)
})

test('deriveHoleBends adds a simple single blow bend', () => {
  const holeInput: Hole = {
    blow: 9,
    draw: 11,
  }
  const expectedHoleOutput: Hole = {
    blow: 9,
    draw: 11,
    bends: [10],
  }

  const actualHoleOutput = deriveHoleBends(holeInput)

  expect(actualHoleOutput).toStrictEqual(expectedHoleOutput)
})

test('deriveHoleBends adds a triple blow bend', () => {
  const holeInput: Hole = {
    blow: 12,
    draw: 8,
  }
  const expectedHoleOutput: Hole = {
    blow: 12,
    draw: 8,
    blowBends: [9, 10, 11],
  }

  const actualHoleOutput = deriveHoleBends(holeInput)

  expect(actualHoleOutput).toStrictEqual(expectedHoleOutput)
})

test('deriveHoleBends adds no bends on 2 identical reeds', () => {
  const holeInput: Hole = {
    blow: 18,
    draw: 18,
  }

  const actualHoleOutput = deriveHoleBends(holeInput)

  expect(actualHoleOutput).toStrictEqual(holeInput)
})
