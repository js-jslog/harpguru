import type { HarpStrata } from 'harpstrata'
import type { DegreeIds } from 'harpparts'

import { isMatchActiveIds } from '../../../../utils'

export const reduceHarpStrataToActiveDegreeIds = (
  harpStrata: HarpStrata,
  prevActiveDegreeIds?: ReadonlyArray<DegreeIds>
): ReadonlyArray<DegreeIds> => {
  const { activeDegreeIds: nextActiveDegreeIds } = harpStrata
  if (!prevActiveDegreeIds) return nextActiveDegreeIds
  if (isMatchActiveIds(prevActiveDegreeIds, nextActiveDegreeIds))
    return prevActiveDegreeIds
  return nextActiveDegreeIds
}
