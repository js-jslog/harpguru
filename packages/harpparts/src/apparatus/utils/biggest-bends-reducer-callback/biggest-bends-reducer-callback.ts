import type { Hole } from '../../types'

type Accumulator = {
  readonly biggestBlow: number
  readonly biggestDraw: number
}

export const biggestBendsReducerCallback = (
  accumulator: Accumulator,
  currentValue: Hole
): Accumulator => {
  const {
    bends: { length: currBends },
    blowbends: { length: currBlowbends },
    overblows: { length: currOverblows },
    overdraws: { length: currOverdraws },
  } = currentValue
  const { biggestBlow: accBigBlow, biggestDraw: accBigDraw } = accumulator
  const currBigBlow =
    currBlowbends > currOverblows ? currBlowbends : currOverblows
  const currBigDraw = currBends > currOverdraws ? currBends : currOverdraws

  return {
    ...accumulator,
    biggestBlow: accBigBlow > currBigBlow ? accBigBlow : currBigBlow,
    biggestDraw: accBigDraw > currBigDraw ? accBigDraw : currBigDraw,
  }
}
