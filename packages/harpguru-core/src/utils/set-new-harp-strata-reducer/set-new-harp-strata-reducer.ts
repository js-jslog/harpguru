import type { Dispatch } from 'reactn/default'
import type { HarpStrata } from 'harpstrata'

import { getNewColumnBoundsForDispatcher } from '../get-new-column-bounds-for-dispatcher'
import type { GlobalState } from '../../types'

export const setNewHarpStrataReducer = (
  global: GlobalState,
  _dispatch: Dispatch,
  newHarpStrata: HarpStrata
): Pick<GlobalState, 'activeHarpStrata' | 'columnBounds'> => {
  const newGlobal = {
    ...global,
    activeHarpStrata: newHarpStrata,
  }

  return {
    ...newGlobal,
    ...getNewColumnBoundsForDispatcher(newGlobal, _dispatch),
  }
}
