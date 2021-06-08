import type { ReedPair, Hole } from '../../types'

export const reedPairToHole = (reedPair: ReedPair): Hole => {
  const [blow, draw] = reedPair
  return {
    blow,
    draw,
    bends: [],
    blowBends: [],
    overblows: [],
    overdraws: [],
  }
}
