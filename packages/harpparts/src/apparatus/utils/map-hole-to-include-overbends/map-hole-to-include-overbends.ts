import type { Hole } from '../../types'
import { ValvingIds } from '../../../valving'

export const mapHoleToIncludeOverbends = (
  valvingId: ValvingIds,
  holeInput: Hole
): Hole => {
  if (valvingId === ValvingIds.HalfValved) return holeInput

  const { blow, draw } = holeInput
  if (blow < draw) return { ...holeInput, overblows: [draw + 1] }
  if (blow > draw) return { ...holeInput, overdraws: [blow + 1] }
  return { ...holeInput }
}
