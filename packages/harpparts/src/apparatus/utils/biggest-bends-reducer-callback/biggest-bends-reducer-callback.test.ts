import type { Hole } from '../../types'

import { biggestBendsReducerCallback } from './biggest-bends-reducer-callback'

test('biggestBendsReducerCallback returns accumulator when no bends', () => {
  const accumulator = {
    biggestBlow: 5,
    biggestDraw: 5,
  }
  const currentValue: Hole = {
    blow: 9,
    draw: 10,
    bends: [],
    blowbends: [],
    overblows: [],
    overdraws: [],
  }

  const output = biggestBendsReducerCallback(accumulator, currentValue)

  expect(output).toStrictEqual(accumulator)
})

test('biggestBendsReducerCallback returns accumulator when all bends are smaller than accumulator', () => {
  const accumulator = {
    biggestBlow: 5,
    biggestDraw: 5,
  }
  const currentValue: Hole = {
    blow: 9,
    draw: 10,
    bends: [],
    blowbends: [],
    overblows: [],
    overdraws: [],
  }

  const output = biggestBendsReducerCallback(accumulator, currentValue)

  expect(output).toStrictEqual(accumulator)
})

test('biggestBendsReducerCallback adds new biggestBlow when blowbends are bigger', () => {
  const accumulator = {
    biggestBlow: 1,
    biggestDraw: 4,
  }
  const currentValue: Hole = {
    blow: 12,
    draw: 9,
    bends: [],
    blowbends: [10, 11],
    overblows: [],
    overdraws: [],
  }

  const expectedOutput = {
    biggestBlow: 2,
    biggestDraw: 4,
  }

  const output = biggestBendsReducerCallback(accumulator, currentValue)

  expect(output).toStrictEqual(expectedOutput)
})

test('biggestBendsReducerCallback adds new biggestBlow when overblows are bigger', () => {
  const accumulator = {
    biggestBlow: 0,
    biggestDraw: 0,
  }
  const currentValue: Hole = {
    blow: 9,
    draw: 10,
    bends: [],
    blowbends: [],
    overblows: [11],
    overdraws: [],
  }

  const expectedOutput = {
    biggestBlow: 1,
    biggestDraw: 0,
  }

  const output = biggestBendsReducerCallback(accumulator, currentValue)

  expect(output).toStrictEqual(expectedOutput)
})

test('biggestBendsReducerCallback adds new biggestDraw when bends are bigger', () => {
  const accumulator = {
    biggestBlow: 4,
    biggestDraw: 1,
  }
  const currentValue: Hole = {
    blow: 8,
    draw: 12,
    bends: [9, 10, 11],
    blowbends: [],
    overblows: [],
    overdraws: [],
  }

  const expectedOutput = {
    biggestBlow: 4,
    biggestDraw: 3,
  }

  const output = biggestBendsReducerCallback(accumulator, currentValue)

  expect(output).toStrictEqual(expectedOutput)
})

test('biggestBendsReducerCallback adds new biggestDraw when overdraws are bigger', () => {
  const accumulator = {
    biggestBlow: 0,
    biggestDraw: 0,
  }
  const currentValue: Hole = {
    blow: 10,
    draw: 9,
    bends: [],
    blowbends: [],
    overblows: [],
    overdraws: [11],
  }

  const expectedOutput = {
    biggestBlow: 0,
    biggestDraw: 1,
  }

  const output = biggestBendsReducerCallback(accumulator, currentValue)

  expect(output).toStrictEqual(expectedOutput)
})
