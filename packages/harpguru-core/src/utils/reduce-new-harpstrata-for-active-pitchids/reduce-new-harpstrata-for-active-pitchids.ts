import type { Dispatch } from 'reactn/default'
import type { HarpStrata } from 'harpstrata'

import { compareActiveIds } from '../compare-active-ids'
import type { GlobalState } from '../../types'

export const reduceNewHarpStrataForActivePitchIds = (
  global: GlobalState,
  _dipatch: Dispatch,
  newHarpStrata: HarpStrata
): Pick<GlobalState, 'activePitchIds'> => {
  const { activePitchIds } = global
  const { activePitchIds: newActivePitchIds } = newHarpStrata

  if (compareActiveIds(activePitchIds, newActivePitchIds))
    return {
      activePitchIds,
    }
  return {
    activePitchIds: newActivePitchIds,
  }
}
