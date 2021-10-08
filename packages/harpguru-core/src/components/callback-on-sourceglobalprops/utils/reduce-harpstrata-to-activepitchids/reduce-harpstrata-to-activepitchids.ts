import type { HarpStrata } from 'harpstrata'
import type { PitchIds } from 'harpparts'

import { isMatchActiveIds } from '../../../../utils'

export const reduceHarpStrataToActivePitchIds = (
  prevActivePitchIds: ReadonlyArray<PitchIds>,
  harpStrata: HarpStrata
): ReadonlyArray<PitchIds> => {
  const { activePitchIds: nextActivePitchIds } = harpStrata
  if (isMatchActiveIds(prevActivePitchIds, nextActivePitchIds))
    return prevActivePitchIds
  return nextActivePitchIds
}
