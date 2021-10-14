import { getHarpStrata } from 'harpstrata'
import type { HarpStrata } from 'harpstrata'

export const reduceEmptyActiveIdsToHarpStrata = (
  prevHarpStrata: HarpStrata
): HarpStrata => {
  const {
    apparatus: { tuningId, valvingId },
    harpKeyId,
    pozitionId,
    activeDegreeIds,
  } = prevHarpStrata

  if (activeDegreeIds.length === 0) return prevHarpStrata

  const nextHarpStrataProps = {
    tuningId,
    valvingId,
    harpKeyId,
    pozitionId,
    activeIds: [],
  }
  const nextHarpStrata = getHarpStrata(nextHarpStrataProps)
  return nextHarpStrata
}
