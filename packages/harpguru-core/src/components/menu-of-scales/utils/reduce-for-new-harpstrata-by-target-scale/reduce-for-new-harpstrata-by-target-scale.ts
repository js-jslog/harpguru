import { getHarpStrata, HarpStrata } from 'harpstrata'
import type { DegreeIds } from 'harpparts'

import { isMatchedActiveIds } from '../../../../utils'

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
  if (isMatchedActiveIds(activeDegreeIds, targetScale)) return activeHarpStrata
  const nextHarpStrata = getHarpStrata({
    tuningId,
    valvingId,
    pozitionId,
    harpKeyId,
    activeIds: targetScale,
  })
  return nextHarpStrata
}
