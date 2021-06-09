import type { Hole } from '../../types'

export type Accumulator = {
  readonly biggestBlow: number
  readonly biggestDraw: number
}

export const findBiggestBendsReducerCallback = (
  accumulator: Accumulator,
  currentValue: Hole
): Accumulator => {
  const { bends, blowbends, overblows, overdraws } = currentValue
  const biggestBlow =
    blowbends.length > overblows.length ? blowbends.length : overblows.length
  const biggestDraw =
    bends.length > overdraws.length ? bends.length : overdraws.length

  return {
    ...accumulator,
    biggestBlow:
      accumulator.biggestBlow > biggestBlow
        ? accumulator.biggestBlow
        : biggestBlow,
    biggestDraw:
      accumulator.biggestDraw > biggestDraw
        ? accumulator.biggestDraw
        : biggestDraw,
  }
}
