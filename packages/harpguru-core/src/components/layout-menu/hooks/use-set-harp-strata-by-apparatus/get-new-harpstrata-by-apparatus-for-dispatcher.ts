import Dispatcher from 'reactn/types/dispatcher'
import { getHarpStrata, getPropsForHarpStrata } from 'harpstrata'
import type { HarpStrataProps } from 'harpstrata'
import type { ApparatusIds } from 'harpparts'

import { DisplayModes, GlobalState } from '../../../../types'

export const getNewHarpStrataByApparatusForDispatcher = (
  global: GlobalState,
  _dipatch: Dispatcher,
  apparatusId: ApparatusIds
): Pick<GlobalState, 'activeHarpStrata'> => {
  const { activeHarpStrata, activeDisplayMode } = global

  const newHarpStrataProps: HarpStrataProps = {
    ...getPropsForHarpStrata(
      activeHarpStrata,
      activeDisplayMode === DisplayModes.Pitch ? 'PITCH' : 'DEGREE'
    ),
    apparatusId,
  }
  return {
    activeHarpStrata: getHarpStrata(newHarpStrataProps),
  }
}
