import { getHarpStrata, HarpStrata } from 'harpstrata'
import type { DegreeIds } from 'harpparts'

import { isMatchActiveIds } from '../../../../utils'

export const reduceScaleToHarpStrata = (
  prevHarpStrata: HarpStrata,
  targetScale: ReadonlyArray<DegreeIds>
): HarpStrata => {
  const {
    apparatus: { tuningId, valvingId },
    pozitionId,
    harpKeyId,
    activeDegreeIds,
  } = prevHarpStrata
  if (isMatchActiveIds(activeDegreeIds, targetScale)) return prevHarpStrata
  const nextHarpStrata = getHarpStrata({
    tuningId,
    valvingId,
    pozitionId,
    harpKeyId,
    activeIds: targetScale,
  })
  return nextHarpStrata
}
