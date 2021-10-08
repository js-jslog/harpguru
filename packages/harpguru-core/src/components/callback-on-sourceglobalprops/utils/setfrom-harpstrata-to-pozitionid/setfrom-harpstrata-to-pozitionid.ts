import type { HarpStrata } from 'harpstrata'
import type { PozitionIds } from 'harpparts'

import { isMatchPozitionIds } from '../ismatch-pozitionids'

export const setFromHarpStrataToPozitionId = (
  harpStrata: HarpStrata,
  prevPozitionId: PozitionIds,
  setPozitionId: (arg0: PozitionIds) => void
): PozitionIds => {
  const { pozitionId: nextPozitionId } = harpStrata
  if (!isMatchPozitionIds(prevPozitionId, nextPozitionId))
    setPozitionId(nextPozitionId)
  return nextPozitionId
}
