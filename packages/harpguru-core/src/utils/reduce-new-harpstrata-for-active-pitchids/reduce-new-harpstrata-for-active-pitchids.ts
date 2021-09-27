import type { Dispatch } from 'reactn/default'
import type { HarpStrata } from 'harpstrata'

import type { GlobalState } from '../../types'

// Make sure to add unit tests for the return value
// equality checks, and create a util for all the logic
// preseding that.
export const reduceNewHarpStrataForActivePitchIds = (
  global: GlobalState,
  _dipatch: Dispatch,
  newHarpStrata: HarpStrata
): Pick<GlobalState, 'activePitchIds'> => {
  const { activePitchIds } = global
  const { activePitchIds: newActivePitchIds } = newHarpStrata

  const match1 = activePitchIds.every(
    (item, index) => item === newActivePitchIds[index]
  )
  const match2 = newActivePitchIds.every(
    (item, index) => item === activePitchIds[index]
  )

  if (match1 && match2)
    return {
      activePitchIds,
    }
  return {
    activePitchIds: newActivePitchIds,
  }
}
