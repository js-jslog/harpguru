import type { ActiveDegreeIds, HarpStrata } from 'harpstrata'

import { reduceHarpStrataToActiveDegreeIds } from '../reduce-harpstrata-to-activedegreeids'
import { isMatchedActiveIds } from '../../../../utils'

export const setFromHarpStrataToActiveDegreeIds = (
  newHarpStrata: HarpStrata,
  prevActiveDegreeIds: ActiveDegreeIds,
  setActiveDegreeIds: (arg0: ActiveDegreeIds) => void
): ActiveDegreeIds => {
  const nextActiveDegreeIds = reduceHarpStrataToActiveDegreeIds(newHarpStrata)
  if (!isMatchedActiveIds(nextActiveDegreeIds, prevActiveDegreeIds))
    setActiveDegreeIds(nextActiveDegreeIds)
  return nextActiveDegreeIds
}
