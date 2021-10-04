import type { ActiveDegreeIds, HarpStrata } from 'harpstrata'

import { deriveFromSourceHarpStrataActiveDegreeIds } from '../derivefromsource-harpstrata-activedegreeids'
import { isMatchedActiveIds } from '../../../../utils'

export const setFromSourceHarpStrataActiveDegreeIds = (
  newHarpStrata: HarpStrata,
  prevActiveDegreeIds: ActiveDegreeIds,
  setActiveDegreeIds: (arg0: ActiveDegreeIds) => void
): ActiveDegreeIds => {
  const nextActiveDegreeIds = deriveFromSourceHarpStrataActiveDegreeIds(
    newHarpStrata
  )
  if (!isMatchedActiveIds(nextActiveDegreeIds, prevActiveDegreeIds))
    setActiveDegreeIds(nextActiveDegreeIds)
  return nextActiveDegreeIds
}
