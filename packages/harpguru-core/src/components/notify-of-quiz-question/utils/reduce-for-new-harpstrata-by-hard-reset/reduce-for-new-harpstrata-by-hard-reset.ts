import { getHarpStrata } from 'harpstrata'
import type { HarpStrata } from 'harpstrata'

export const reduceForNewHarpStrataByHardReset = (
  activeHarpStrata: HarpStrata
): HarpStrata => {
  const {
    apparatus: { tuningId, valvingId },
    harpKeyId,
    pozitionId,
    activeDegreeIds,
  } = activeHarpStrata

  if (activeDegreeIds.length === 0) return activeHarpStrata

  const harpStrataProps = {
    tuningId,
    valvingId,
    harpKeyId,
    pozitionId,
    activeIds: [],
  }
  const resetHarpStrata = getHarpStrata(harpStrataProps)
  return resetHarpStrata
}
