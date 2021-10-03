import { getHarpStrata, HarpStrata } from 'harpstrata'
import type { DegreeIds } from 'harpparts'

import { compareActiveIds } from '../../../../utils'

export const reduceForNewHarpStrataByTargetScale = (
  activeHarpStrata: HarpStrata,
  targetScale: ReadonlyArray<DegreeIds>
): HarpStrata => {
  const {
    apparatus: { tuningId, valvingId },
    pozitionId,
    harpKeyId,
    activeDegreeIds,
  } = activeHarpStrata
  if (compareActiveIds(activeDegreeIds, targetScale)) return activeHarpStrata
  const nextHarpStrata = getHarpStrata({
    tuningId,
    valvingId,
    pozitionId,
    harpKeyId,
    activeIds: targetScale,
  })
  return nextHarpStrata
}
