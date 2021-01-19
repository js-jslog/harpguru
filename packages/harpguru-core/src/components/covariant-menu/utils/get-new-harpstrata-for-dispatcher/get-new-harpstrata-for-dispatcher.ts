import Dispatcher from 'reactn/types/dispatcher'
import { getHarpStrata, getPropsForHarpStrata } from 'harpstrata'
import type { HarpStrataProps } from 'harpstrata'

import { DisplayModes, GlobalState } from '../../../../types'

export const getNewHarpStrataForDispatcher = (
  global: GlobalState,
  _dipatch: Dispatcher,
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
  return {
    activeHarpStrata: getHarpStrata(newHarpStrataProps),
  }
}
