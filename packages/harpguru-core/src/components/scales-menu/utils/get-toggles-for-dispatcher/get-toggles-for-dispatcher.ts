import Dispatcher from 'reactn/types/dispatcher'
import type { DegreeIds } from 'harpparts'

import { rebufferForInput } from '../rebuffer-for-input'
import type { GlobalState } from '../../../../types'

export const getTogglesForDispatcher = (
  global: GlobalState,
  _dipatch: Dispatcher,
  targetActiveDegrees: ReadonlyArray<DegreeIds>
): Pick<GlobalState, 'bufferedActivityToggles'> => {
  const { activeHarpStrata } = global
  const { activeDegreeIds } = activeHarpStrata

  return {
    bufferedActivityToggles: rebufferForInput(
      activeDegreeIds,
      targetActiveDegrees
    ),
  }
}
