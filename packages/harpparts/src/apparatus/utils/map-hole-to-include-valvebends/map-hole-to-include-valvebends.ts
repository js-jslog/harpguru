import type { Hole } from '../../types'

export const mapHoleToIncludeValvebends = (holeInput: Hole): Hole => {
  const { blow, draw } = holeInput

  if (blow === draw)
    return { ...holeInput, valvedblows: [blow - 1], valveddraws: [draw - 1] }
  if (blow < draw) return { ...holeInput, valvedblows: [blow - 1] }
  return { ...holeInput, valveddraws: [draw - 1] }
}
