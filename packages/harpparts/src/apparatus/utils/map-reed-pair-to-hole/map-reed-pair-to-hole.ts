import type { ReedPair, Hole } from '../../types'

export const mapReedPairToHole = (reedPair: ReedPair): Hole => {
  const [blow, draw] = reedPair
  return {
    blow,
    draw,
    blowbends: [],
    bends: [],
    overblows: [],
    overdraws: [],
    valvedblows: [],
    valveddraws: [],
  }
}
