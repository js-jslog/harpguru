import type { Dispatch } from 'reactn/default'
import type { HarpStrata } from 'harpstrata'

import { reduceNewHarpStrataForViewablePitchMatrix } from '../reduce-new-harpstrata-for-viewable-pitch-matrix'
import { reduceNewHarpStrataForViewableDegreeMatrix } from '../reduce-new-harpstrata-for-viewable-degree-matrix'
import { reduceNewHarpStrataForRootPitchId } from '../reduce-new-harpstrata-for-rootpitchid'
import { reduceNewHarpStrataForPozitionId } from '../reduce-new-harpstrata-for-pozitionid'
import { reduceNewHarpStrataForPitchMatrix } from '../reduce-new-harpstrata-for-pitch-matrix'
import { reduceNewHarpStrataForLayoutFacts } from '../reduce-new-harpstrata-for-layout-facts'
import { reduceNewHarpStrataForHarpKeyId } from '../reduce-new-harpstrata-for-harpkeyid'
import { reduceNewHarpStrataForDegreeMatrix } from '../reduce-new-harpstrata-for-degree-matrix'
import { reduceNewHarpStrataForColumnBounds } from '../reduce-new-harpstrata-for-column-bounds'
import { reduceNewHarpStrataForActivePitchIds } from '../reduce-new-harpstrata-for-active-pitchids'
import { reduceNewHarpStrataForActiveDegreeIds } from '../reduce-new-harpstrata-for-active-degreeids'
import type { GlobalState } from '../../types'

export const reduceNewHarpStrataToGlobal = (
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
  | 'pozitionId'
  | 'rootPitchId'
  | 'harpKeyId'
  | 'viewableDegreeMatrix'
  | 'viewablePitchMatrix'
  | 'layoutFacts'
> => {
  return {
    ...global,
    activeHarpStrata: newHarpStrata,
    ...reduceNewHarpStrataForColumnBounds(global, _dispatch, newHarpStrata),
    ...reduceNewHarpStrataForDegreeMatrix(global, _dispatch, newHarpStrata),
    ...reduceNewHarpStrataForPitchMatrix(global, _dispatch, newHarpStrata),
    ...reduceNewHarpStrataForActiveDegreeIds(global, _dispatch, newHarpStrata),
    ...reduceNewHarpStrataForActivePitchIds(global, _dispatch, newHarpStrata),
    ...reduceNewHarpStrataForPozitionId(global, _dispatch, newHarpStrata),
    ...reduceNewHarpStrataForRootPitchId(global, _dispatch, newHarpStrata),
    ...reduceNewHarpStrataForHarpKeyId(global, _dispatch, newHarpStrata),
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
    ...reduceNewHarpStrataForLayoutFacts(global, _dispatch, newHarpStrata),
  }
}
