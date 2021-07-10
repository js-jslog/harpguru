import Dispatcher from 'reactn/types/dispatcher'
import { getHarpStrata, getPropsForHarpStrata } from 'harpstrata'
import type { HarpStrataProps } from 'harpstrata'
import type { TuningIds } from 'harpparts'

import { DisplayModes, GlobalState } from '../../../../types'

export const getNewHarpStrataByTuningForDispatcher = (
  global: GlobalState,
  _dipatch: Dispatcher,
  tuningId: TuningIds
): Pick<GlobalState, 'activeHarpStrata'> => {
  const { activeHarpStrata, activeDisplayMode } = global

  const newHarpStrataProps: HarpStrataProps = {
    ...getPropsForHarpStrata(
      activeHarpStrata,
      activeDisplayMode === DisplayModes.Pitch ? 'PITCH' : 'DEGREE'
    ),
    tuningId,
  }
  return {
    activeHarpStrata: getHarpStrata(newHarpStrataProps),
  }
}
