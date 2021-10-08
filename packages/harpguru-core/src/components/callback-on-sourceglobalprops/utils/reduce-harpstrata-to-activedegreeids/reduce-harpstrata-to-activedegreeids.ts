import type { HarpStrata } from 'harpstrata'
import type { DegreeIds } from 'harpparts'

import { isMatchActiveIds } from '../../../../utils'

export const reduceHarpStrataToActiveDegreeIds = (
  prevActiveDegreeIds: ReadonlyArray<DegreeIds>,
  harpStrata: HarpStrata
): ReadonlyArray<DegreeIds> => {
  const { activeDegreeIds: nextActiveDegreeIds } = harpStrata
  if (isMatchActiveIds(prevActiveDegreeIds, nextActiveDegreeIds))
    return prevActiveDegreeIds
  return nextActiveDegreeIds
}
