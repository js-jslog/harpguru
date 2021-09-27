import type { Dispatch } from 'reactn/default'
import type { HarpStrata } from 'harpstrata'

import { reduceNewHarpStrataForViewableDegreeMatrix } from '../reduce-new-harpstrata-for-viewable-degree-matrix'
import { reduceNewHarpStrataForPitchMatrix } from '../reduce-new-harpstrata-for-pitch-matrix'
import { reduceNewHarpStrataForDegreeMatrix } from '../reduce-new-harpstrata-for-degree-matrix'
import { reduceNewHarpStrataForColumnBounds } from '../reduce-new-harpstrata-for-column-bounds'
import type { GlobalState } from '../../types'

export const reduceForNewHarpStrata = (
  global: GlobalState,
  _dispatch: Dispatch,
  newHarpStrata: HarpStrata
): Pick<
  GlobalState,
  | 'activeHarpStrata'
  | 'activeDegreeMatrix'
  | 'activePitchMatrix'
  | 'columnBounds'
  | 'viewableDegreeMatrix'
> => {
  return {
    ...global,
    activeHarpStrata: newHarpStrata,
    ...reduceNewHarpStrataForDegreeMatrix(global, _dispatch, newHarpStrata),
    ...reduceNewHarpStrataForPitchMatrix(global, _dispatch, newHarpStrata),
    ...reduceNewHarpStrataForColumnBounds(global, _dispatch, newHarpStrata),
    ...reduceNewHarpStrataForViewableDegreeMatrix(
      global,
      _dispatch,
      newHarpStrata
    ),
  }
}
