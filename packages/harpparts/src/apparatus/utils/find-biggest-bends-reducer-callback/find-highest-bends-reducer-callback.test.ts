import type { Hole } from '../../types'

import { findBiggestBendsReducerCallback } from './find-biggest-bends-reducer-callback'

test('findBiggestBendsReducerCallback returns accumulator when no bends', () => {
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

  const output = findBiggestBendsReducerCallback(accumulator, currentValue)

  expect(output).toStrictEqual(accumulator)
})
