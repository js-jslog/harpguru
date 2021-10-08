import type { HarpStrata } from 'harpstrata'
import type { PitchIds } from 'harpparts'

import { reduceHarpStrataToActivePitchIds } from '../reduce-harpstrata-to-activepitchids'
import { isMatchActiveIds } from '../../../../utils'

export const setFromHarpStrataToActivePitchIds = (
  harpStrata: HarpStrata,
  prevActivePitchIds: ReadonlyArray<PitchIds>,
  setActivePitchIds: (arg0: ReadonlyArray<PitchIds>) => void
): ReadonlyArray<PitchIds> => {
  const nextActivePitchIds = reduceHarpStrataToActivePitchIds(harpStrata)
  if (!isMatchActiveIds(nextActivePitchIds, prevActivePitchIds))
    setActivePitchIds(nextActivePitchIds)
  return nextActivePitchIds
}
