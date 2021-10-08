import type { ActiveDegreeIds, HarpStrata } from 'harpstrata'

import { reduceHarpStrataToActiveDegreeIds } from '../reduce-harpstrata-to-activedegreeids'
import { isMatchActiveIds } from '../../../../utils'

export const setFromHarpStrataToActiveDegreeIds = (
  harpStrata: HarpStrata,
  prevActiveDegreeIds: ActiveDegreeIds,
  setActiveDegreeIds: (arg0: ActiveDegreeIds) => void
): ActiveDegreeIds => {
  const nextActiveDegreeIds = reduceHarpStrataToActiveDegreeIds(harpStrata)
  if (!isMatchActiveIds(nextActiveDegreeIds, prevActiveDegreeIds))
    setActiveDegreeIds(nextActiveDegreeIds)
  return nextActiveDegreeIds
}
