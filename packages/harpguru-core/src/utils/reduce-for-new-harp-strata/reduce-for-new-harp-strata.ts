import type { Dispatch } from 'reactn/default'
import type { HarpStrata } from 'harpstrata'

import { reduceForNewColumnBounds } from '../reduce-for-new-column-bounds'
import type { GlobalState } from '../../types'

export const reduceForNewHarpStrata = (
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
    ...reduceForNewColumnBounds(newGlobal, _dispatch),
  }
}
