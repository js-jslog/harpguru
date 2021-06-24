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
  // Lengths of zero will evaluate to false here. We are relying on the
  // feature of Hole's that they do not have multiple bends of a blow or
  // draw type on a single hole. This logic would not work if it were
  // possible to have a bend and an overdraw on the same hole, because
  // it would not necessariliy find the largest of the two.
  const currBigBlow = currBlowbends || currOverblows || currValvedblows
  const currBigDraw = currBends || currOverdraws || currValveddraws

  return {
    ...accumulator,
    biggestBlow: accBigBlow > currBigBlow ? accBigBlow : currBigBlow,
    biggestDraw: accBigDraw > currBigDraw ? accBigDraw : currBigDraw,
  }
}
