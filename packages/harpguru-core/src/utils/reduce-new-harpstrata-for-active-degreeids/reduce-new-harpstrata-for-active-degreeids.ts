import type { Dispatch } from 'reactn/default'
import type { HarpStrata } from 'harpstrata'

import type { GlobalState } from '../../types'

// Make sure to add unit tests for the return value
// equality checks, and create a util for all the logic
// preseding that.
export const reduceNewHarpStrataForActiveDegreeIds = (
  global: GlobalState,
  _dipatch: Dispatch,
  newHarpStrata: HarpStrata
): Pick<GlobalState, 'activeDegreeIds'> => {
  const { activeDegreeIds } = global
  const { activeDegreeIds: newActiveDegreeIds } = newHarpStrata

  const match1 = activeDegreeIds.every(
    (item, index) => item === newActiveDegreeIds[index]
  )
  const match2 = newActiveDegreeIds.every(
    (item, index) => item === activeDegreeIds[index]
  )

  if (match1 && match2)
    return {
      activeDegreeIds,
    }
  return {
    activeDegreeIds: newActiveDegreeIds,
  }
}
