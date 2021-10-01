import type { ActiveDegreeIds, HarpStrata } from 'harpstrata'

import { deriveActiveDegreeIds } from '../../utils'
import { compareActiveIds } from '../../../../utils/compare-active-ids'

export const useDeriveActiveDegreeIds = (
  newHarpStrata: HarpStrata,
  prevActiveDegreeIds: ActiveDegreeIds,
  setActiveDegreeIds: (arg0: ActiveDegreeIds) => void
): ActiveDegreeIds => {
  const nextActiveDegreeIds = deriveActiveDegreeIds(newHarpStrata)
  if (!compareActiveIds(nextActiveDegreeIds, prevActiveDegreeIds))
    setActiveDegreeIds(nextActiveDegreeIds)
  return nextActiveDegreeIds
}
