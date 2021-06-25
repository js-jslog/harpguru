import type { Hole } from '../../types'
import { ascendingExclusiveRange } from '../../../packages/ascending-exclusive-range'

export const mapHoleToIncludeBends = (holeInput: Hole): Hole => {
  const bendRange = ascendingExclusiveRange(holeInput.blow, holeInput.draw)
  if (bendRange.length === 0) return holeInput
  if (holeInput.blow > holeInput.draw)
    return { ...holeInput, blowbends: bendRange }
  return { ...holeInput, drawbends: bendRange }
}
