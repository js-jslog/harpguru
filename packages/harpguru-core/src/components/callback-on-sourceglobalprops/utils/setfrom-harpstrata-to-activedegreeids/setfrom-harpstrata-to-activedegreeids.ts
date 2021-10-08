import type { HarpStrata } from 'harpstrata'
import type { DegreeIds } from 'harpparts'

import { reduceHarpStrataToActiveDegreeIds } from '../reduce-harpstrata-to-activedegreeids'
import { isMatchActiveIds } from '../../../../utils'

export const setFromHarpStrataToActiveDegreeIds = (
  harpStrata: HarpStrata,
  prevActiveDegreeIds: ReadonlyArray<DegreeIds>,
  setActiveDegreeIds: (arg0: ReadonlyArray<DegreeIds>) => void
): ReadonlyArray<DegreeIds> => {
  const nextActiveDegreeIds = reduceHarpStrataToActiveDegreeIds(harpStrata)
  if (!isMatchActiveIds(nextActiveDegreeIds, prevActiveDegreeIds))
    setActiveDegreeIds(nextActiveDegreeIds)
  return nextActiveDegreeIds
}
