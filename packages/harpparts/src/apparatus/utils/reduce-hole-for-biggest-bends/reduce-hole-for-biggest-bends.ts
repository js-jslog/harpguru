import type { Hole } from '../../types'

type Accumulator = {
  readonly biggestBlow: number
  readonly biggestDraw: number
}

export const reduceHoleForBiggestBends = (
  accumulator: Accumulator,
  currentValue: Hole
): Accumulator => {
  const {
    bends: { length: currBends },
    blowbends: { length: currBlowbends },
    overblows: { length: currOverblows },
    overdraws: { length: currOverdraws },
    valvedblows: { length: currValvedblows },
    valveddraws: { length: currValveddraws },
  } = currentValue
  const { biggestBlow: accBigBlow, biggestDraw: accBigDraw } = accumulator
  const currBigBlow = currBlowbends || currOverblows || currValvedblows
  const currBigDraw = currBends || currOverdraws || currValveddraws

  return {
    ...accumulator,
    biggestBlow: accBigBlow > currBigBlow ? accBigBlow : currBigBlow,
    biggestDraw: accBigDraw > currBigDraw ? accBigDraw : currBigDraw,
  }
}
