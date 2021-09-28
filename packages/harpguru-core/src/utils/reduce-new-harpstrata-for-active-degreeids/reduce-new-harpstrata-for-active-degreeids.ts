import type { Dispatch } from 'reactn/default'
import type { HarpStrata } from 'harpstrata'

import { compareActiveIds } from '../compare-active-ids'
import type { GlobalState } from '../../types'

export const reduceNewHarpStrataForActiveDegreeIds = (
  global: GlobalState,
  _dipatch: Dispatch,
  newHarpStrata: HarpStrata
): Pick<GlobalState, 'activeDegreeIds'> => {
  const { activeDegreeIds } = global
  const { activeDegreeIds: newActiveDegreeIds } = newHarpStrata

  if (compareActiveIds(activeDegreeIds, newActiveDegreeIds))
    return {
      activeDegreeIds,
    }
  return {
    activeDegreeIds: newActiveDegreeIds,
  }
}
