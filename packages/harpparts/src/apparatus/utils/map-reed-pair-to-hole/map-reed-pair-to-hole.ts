import type { ReedPair, Hole } from '../../types'

export const mapReedPairToHole = (reedPair: ReedPair): Hole => {
  const [blow, draw] = reedPair
  return {
    blow,
    draw,
    bends: [],
    blowbends: [],
    overblows: [],
    overdraws: [],
  }
}
