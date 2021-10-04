import type { ActivePitchIds, HarpStrata } from 'harpstrata'

import { reduceHarpStrataToActivePitchIds } from '../reduce-harpstrata-to-activepitchids'
import { isMatchedActiveIds } from '../../../../utils'

export const setFromHarpStrataToActivePitchIds = (
  newHarpStrata: HarpStrata,
  prevActivePitchIds: ActivePitchIds,
  setActivePitchIds: (arg0: ActivePitchIds) => void
): ActivePitchIds => {
  const nextActivePitchIds = reduceHarpStrataToActivePitchIds(newHarpStrata)
  if (!isMatchedActiveIds(nextActivePitchIds, prevActivePitchIds))
    setActivePitchIds(nextActivePitchIds)
  return nextActivePitchIds
}
