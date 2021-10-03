import type { ActivePitchIds, HarpStrata } from 'harpstrata'

import { deriveActivePitchIds } from '../../utils'
import { compareActiveIds } from '../../../../utils'

export const useDeriveActivePitchIds = (
  newHarpStrata: HarpStrata,
  prevActivePitchIds: ActivePitchIds,
  setActivePitchIds: (arg0: ActivePitchIds) => void
): ActivePitchIds => {
  const nextActivePitchIds = deriveActivePitchIds(newHarpStrata)
  if (!compareActiveIds(nextActivePitchIds, prevActivePitchIds))
    setActivePitchIds(nextActivePitchIds)
  return nextActivePitchIds
}
