import { ascendingExclusiveRange } from '../ascending-exclusive-range'
import type { Hole } from '../../types'

export const mapHoleToIncludeBends = (holeInput: Hole): Hole => {
  const bendRange = ascendingExclusiveRange(holeInput.blow, holeInput.draw)
  if (bendRange.length === 0) return holeInput
  if (holeInput.blow < holeInput.draw) return { ...holeInput, bends: bendRange }
  return { ...holeInput, blowbends: bendRange }
}
