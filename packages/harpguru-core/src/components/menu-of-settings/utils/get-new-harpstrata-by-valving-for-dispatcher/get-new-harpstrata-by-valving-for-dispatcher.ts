import Dispatcher from 'reactn/types/dispatcher'
import { getHarpStrata, getPropsForHarpStrata } from 'harpstrata'
import type { HarpStrataProps } from 'harpstrata'
import type { ValvingIds } from 'harpparts'

import { DisplayModes, GlobalState } from '../../../../types'

export const getNewHarpStrataByValvingForDispatcher = (
  global: GlobalState,
  _dipatch: Dispatcher,
  valvingId: ValvingIds
): Pick<GlobalState, 'activeHarpStrata'> => {
  const { activeHarpStrata, activeDisplayMode } = global

  const newHarpStrataProps: HarpStrataProps = {
    ...getPropsForHarpStrata(
      activeHarpStrata,
      activeDisplayMode === DisplayModes.Pitch ? 'PITCH' : 'DEGREE'
    ),
    valvingId,
  }
  return {
    activeHarpStrata: getHarpStrata(newHarpStrataProps),
  }
}
