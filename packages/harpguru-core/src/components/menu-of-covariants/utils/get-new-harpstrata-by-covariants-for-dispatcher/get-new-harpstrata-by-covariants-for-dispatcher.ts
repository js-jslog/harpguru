import type { Dispatch } from 'reactn/default'
import { getHarpStrata, getPropsForHarpStrata } from 'harpstrata'
import type { HarpStrataProps } from 'harpstrata'

import { setNewHarpStrataReducer } from '../../../../utils'
import type { GlobalState } from '../../../../types'
import { DisplayModes } from '../../../../types'

export const getNewHarpStrataByCovariantsForDispatcher = (
  global: GlobalState,
  _dispatch: Dispatch,
  partialHarpStrata: Pick<HarpStrataProps, 'harpKeyId' | 'pozitionId'>
): Pick<GlobalState, 'activeHarpStrata' | 'columnBounds'> => {
  const { activeHarpStrata, activeDisplayMode } = global

  const newHarpStrataProps: HarpStrataProps = {
    ...getPropsForHarpStrata(
      activeHarpStrata,
      activeDisplayMode === DisplayModes.Pitch ? 'PITCH' : 'DEGREE'
    ),
    harpKeyId: partialHarpStrata.harpKeyId,
    pozitionId: partialHarpStrata.pozitionId,
  }

  const newHarpStrata = getHarpStrata(newHarpStrataProps)

  return setNewHarpStrataReducer(global, _dispatch, newHarpStrata)
}
