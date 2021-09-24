import type { Dispatch } from 'reactn/default'
import type { HarpStrataProps } from 'harpstrata'
import { getHarpStrata } from 'harpstrata'

import { batchToggleDegreeIds, reduceForNewHarpStrata } from '../../utils'
import type { GlobalState } from '../../types'

export const reduceForFlushedToggles = (
  global: GlobalState,
  _dispatch: Dispatch
):
  | Pick<
      GlobalState,
      'activeHarpStrata' | 'bufferedActivityToggles' | 'columnBounds'
    >
  | undefined => {
  const { activeHarpStrata, bufferedActivityToggles } = global

  if (bufferedActivityToggles.length === 0) return

  const {
    apparatus: { tuningId, valvingId },
    pozitionId,
    harpKeyId,
    activeDegreeIds,
  } = activeHarpStrata
  const newActiveDegreeIds = batchToggleDegreeIds(
    activeDegreeIds,
    bufferedActivityToggles
  )
  const newHarpStrataProps: HarpStrataProps = {
    tuningId,
    valvingId,
    pozitionId,
    harpKeyId,
    activeIds: newActiveDegreeIds,
  }

  return {
    ...reduceForNewHarpStrata(
      global,
      _dispatch,
      getHarpStrata(newHarpStrataProps)
    ),
    bufferedActivityToggles: [],
  }
}
