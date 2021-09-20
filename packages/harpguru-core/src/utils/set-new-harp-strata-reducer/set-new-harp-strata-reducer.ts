import type { Dispatch } from 'reactn/default'
import type { HarpStrata } from 'harpstrata'

import { setNewColumnBoundsReducer } from '../set-new-column-bounds-reducer'
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
    ...setNewColumnBoundsReducer(newGlobal, _dispatch),
  }
}
