import type { HarpStrataProps, HarpStrata } from 'harpstrata'
import { getHarpStrata } from 'harpstrata'
import type { DegreeIds } from 'harpparts'

import { batchToggleDegreeIds } from '../batch-toggle-degree-ids'

export const reduceForNewHarpStrataByToggleFlush = (
  activeHarpStrata: HarpStrata,
  bufferedActivityToggles: ReadonlyArray<DegreeIds>
): HarpStrata => {
  if (bufferedActivityToggles.length === 0) return activeHarpStrata

  const {
    apparatus: { tuningId, valvingId },
    pozitionId,
    harpKeyId,
    activeDegreeIds,
  } = activeHarpStrata
  const newActiveDegreeIds = batchToggleDegreeIds(
    activeDegreeIds,
    bufferedActivityToggles
  )
  const nextHarpStrataProps: HarpStrataProps = {
    tuningId,
    valvingId,
    pozitionId,
    harpKeyId,
    activeIds: newActiveDegreeIds,
  }
  const nextHarpStrata = getHarpStrata(nextHarpStrataProps)
  return nextHarpStrata
}
