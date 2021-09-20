//import type { Dispatch } from 'reactn/default'
import Dispatcher from 'reactn/types/dispatcher'
import { getHarpStrata, getPropsForHarpStrata } from 'harpstrata'
import type { HarpStrataProps } from 'harpstrata'

import type { GlobalState } from '../../../../types'
import { DisplayModes } from '../../../../types'

export const getNewHarpStrataByCovariantsForDispatcher = (
  global: GlobalState,
  //_dispatch: Dispatch,
  _dispatch: Dispatcher,
  partialHarpStrata: Pick<HarpStrataProps, 'harpKeyId' | 'pozitionId'>
): Pick<GlobalState, 'activeHarpStrata'> => {
  const { activeHarpStrata, activeDisplayMode } = global

  const newHarpStrataProps: HarpStrataProps = {
    ...getPropsForHarpStrata(
      activeHarpStrata,
      activeDisplayMode === DisplayModes.Pitch ? 'PITCH' : 'DEGREE'
    ),
    harpKeyId: partialHarpStrata.harpKeyId,
    pozitionId: partialHarpStrata.pozitionId,
  }
  //dispatch.newHarpStrata(getHarpStrata(newHarpStrataProps))
  return {
    activeHarpStrata: getHarpStrata(newHarpStrataProps),
  }
}
