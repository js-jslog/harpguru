import type { Dispatch } from 'reactn/default'
import type { HarpStrata } from 'harpstrata'

import { reduceNewHarpStrataForViewablePitchMatrix } from '../reduce-new-harpstrata-for-viewable-pitch-matrix'
import { reduceNewHarpStrataForViewableDegreeMatrix } from '../reduce-new-harpstrata-for-viewable-degree-matrix'
import { reduceNewHarpStrataForPitchMatrix } from '../reduce-new-harpstrata-for-pitch-matrix'
import { reduceNewHarpStrataForDegreeMatrix } from '../reduce-new-harpstrata-for-degree-matrix'
import { reduceNewHarpStrataForColumnBounds } from '../reduce-new-harpstrata-for-column-bounds'
import { reduceNewHarpStrataForActivePitchIds } from '../reduce-new-harpstrata-for-active-pitchids'
import { reduceNewHarpStrataForActiveDegreeIds } from '../reduce-new-harpstrata-for-active-degreeids'
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
  | 'activeDegreeIds'
  | 'activePitchIds'
  | 'viewableDegreeMatrix'
  | 'viewablePitchMatrix'
> => {
  return {
    ...global,
    activeHarpStrata: newHarpStrata,
    ...reduceNewHarpStrataForColumnBounds(global, _dispatch, newHarpStrata),
    ...reduceNewHarpStrataForDegreeMatrix(global, _dispatch, newHarpStrata),
    ...reduceNewHarpStrataForPitchMatrix(global, _dispatch, newHarpStrata),
    ...reduceNewHarpStrataForActiveDegreeIds(global, _dispatch, newHarpStrata),
    ...reduceNewHarpStrataForActivePitchIds(global, _dispatch, newHarpStrata),
    ...reduceNewHarpStrataForViewableDegreeMatrix(
      global,
      _dispatch,
      newHarpStrata
    ),
    ...reduceNewHarpStrataForViewablePitchMatrix(
      global,
      _dispatch,
      newHarpStrata
    ),
  }
}
