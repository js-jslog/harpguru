import type { ActiveDegreeIds, HarpStrata } from 'harpstrata'

import { reduceHarpStrataToActiveDegreeIds } from '../reduce-harpstrata-to-activedegreeids'
import { isMatchActiveIds } from '../../../../utils'

export const setFromHarpStrataToActiveDegreeIds = (
  newHarpStrata: HarpStrata,
  prevActiveDegreeIds: ActiveDegreeIds,
  setActiveDegreeIds: (arg0: ActiveDegreeIds) => void
): ActiveDegreeIds => {
  const nextActiveDegreeIds = reduceHarpStrataToActiveDegreeIds(newHarpStrata)
  if (!isMatchActiveIds(nextActiveDegreeIds, prevActiveDegreeIds))
    setActiveDegreeIds(nextActiveDegreeIds)
  return nextActiveDegreeIds
}
