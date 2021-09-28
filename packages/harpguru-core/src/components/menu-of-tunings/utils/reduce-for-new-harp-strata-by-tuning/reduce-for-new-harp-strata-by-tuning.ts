import type { Dispatch } from 'reactn/default'
import { getHarpStrata, getPropsForHarpStrata } from 'harpstrata'
import type { HarpStrataProps } from 'harpstrata'
import type { TuningIds } from 'harpparts'

import { reduceNewHarpStrataToGlobal } from '../../../../utils'
import { DisplayModes, GlobalState } from '../../../../types'

export const reduceForNewHarpStrataByTuning = (
  global: GlobalState,
  _dispatch: Dispatch,
  tuningId: TuningIds
): Pick<GlobalState, 'activeHarpStrata' | 'columnBounds'> => {
  const { activeHarpStrata, activeDisplayMode } = global

  const newHarpStrataProps: HarpStrataProps = {
    ...getPropsForHarpStrata(
      activeHarpStrata,
      activeDisplayMode === DisplayModes.Pitch ? 'PITCH' : 'DEGREE'
    ),
    tuningId,
  }
  return {
    ...reduceNewHarpStrataToGlobal(
      global,
      _dispatch,
      getHarpStrata(newHarpStrataProps)
    ),
  }
}
