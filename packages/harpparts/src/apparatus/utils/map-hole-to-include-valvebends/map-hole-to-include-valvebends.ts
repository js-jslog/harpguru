import type { Hole } from '../../types'
import { ValvingIds } from '../../../valving'

export const mapHoleToIncludeValvebends = (
  valvingId: ValvingIds,
  holeInput: Hole
): Hole => {
  if (valvingId === ValvingIds.NotValved) return holeInput

  const { blow, draw } = holeInput

  if (blow === draw)
    return { ...holeInput, valvedblows: [blow - 1], valveddraws: [draw - 1] }
  if (blow < draw) return { ...holeInput, valvedblows: [blow - 1] }
  return { ...holeInput, valveddraws: [draw - 1] }
}
