import { getHarpStrata, HarpStrata } from 'harpstrata'
import type { DegreeIds } from 'harpparts'

import { isMatchActiveIds } from '../../../../utils'

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
  if (isMatchActiveIds(activeDegreeIds, targetScale)) return activeHarpStrata
  const nextHarpStrata = getHarpStrata({
    tuningId,
    valvingId,
    pozitionId,
    harpKeyId,
    activeIds: targetScale,
  })
  return nextHarpStrata
}
