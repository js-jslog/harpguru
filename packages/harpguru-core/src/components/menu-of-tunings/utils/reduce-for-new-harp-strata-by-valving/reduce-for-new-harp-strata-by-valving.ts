import type { Dispatch } from 'reactn/default'
import { getHarpStrata, getPropsForHarpStrata } from 'harpstrata'
import type { HarpStrataProps } from 'harpstrata'
import type { ValvingIds } from 'harpparts'

import { reduceForNewHarpStrata } from '../../../../utils'
import { DisplayModes, GlobalState } from '../../../../types'

export const reduceForNewHarpStrataByValving = (
  global: GlobalState,
  _dispatch: Dispatch,
  valvingId: ValvingIds
): Pick<GlobalState, 'activeHarpStrata' | 'columnBounds'> => {
  const { activeHarpStrata, activeDisplayMode } = global

  const newHarpStrataProps: HarpStrataProps = {
    ...getPropsForHarpStrata(
      activeHarpStrata,
      activeDisplayMode === DisplayModes.Pitch ? 'PITCH' : 'DEGREE'
    ),
    valvingId,
  }
  return {
    ...reduceForNewHarpStrata(
      global,
      _dispatch,
      getHarpStrata(newHarpStrataProps)
    ),
  }
}
