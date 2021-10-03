import type { ActiveDegreeIds, HarpStrata } from 'harpstrata'

import { deriveActiveDegreeIds } from '../../utils'
import { isMatchedActiveIds } from '../../../../utils'

export const useDeriveActiveDegreeIds = (
  newHarpStrata: HarpStrata,
  prevActiveDegreeIds: ActiveDegreeIds,
  setActiveDegreeIds: (arg0: ActiveDegreeIds) => void
): ActiveDegreeIds => {
  const nextActiveDegreeIds = deriveActiveDegreeIds(newHarpStrata)
  if (!isMatchedActiveIds(nextActiveDegreeIds, prevActiveDegreeIds))
    setActiveDegreeIds(nextActiveDegreeIds)
  return nextActiveDegreeIds
}
