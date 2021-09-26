import type { Dispatch } from 'reactn/default'
import type { HarpStrata } from 'harpstrata'

import { reduceForNewColumnBounds } from '../reduce-for-new-column-bounds'
import { reduceForActivePitchMatrix } from '../reduce-for-active-pitch-matrix'
import { reduceForActiveDegreeMatrix } from '../reduce-for-active-degree-matrix'
import type { GlobalState } from '../../types'

export const reduceForNewHarpStrata = (
  global: GlobalState,
  _dispatch: Dispatch,
  newHarpStrata: HarpStrata
): Pick<
  GlobalState,
  | 'activeHarpStrata'
  | 'columnBounds'
  | 'activeDegreeMatrix'
  | 'activePitchMatrix'
> => {
  const newGlobal = {
    ...global,
    activeHarpStrata: newHarpStrata,
  }

  return {
    ...newGlobal,
    ...reduceForNewColumnBounds(global, _dispatch, undefined, newHarpStrata),
    ...reduceForActiveDegreeMatrix(
      global,
      _dispatch,
      newHarpStrata.degreeMatrix
    ),
    ...reduceForActivePitchMatrix(global, _dispatch, newHarpStrata.pitchMatrix),
  }
}
