import { useDispatch } from 'reactn'
import { unstable_batchedUpdates } from 'react-native'
import type { HarpStrataProps } from 'harpstrata'
import { getHarpStrata } from 'harpstrata'

import { batchToggleDegreeIds } from '../../utils'
import type { GlobalState } from '../../types'

export const useFlushBufferedActivityToggles = (): (() => void) => {
  const updateActiveHarpStrata = useDispatch((global: GlobalState) => {
    const { activeHarpStrata, bufferedActivityToggles } = global

    if (bufferedActivityToggles.length === 0) return

    const {
      apparatus: { tuningId: apparatusId },
      pozitionId,
      harpKeyId,
      activeDegreeIds,
    } = activeHarpStrata
    const newActiveDegreeIds = batchToggleDegreeIds(
      activeDegreeIds,
      bufferedActivityToggles
    )
    const newHarpStrataProps: HarpStrataProps = {
      apparatusId,
      pozitionId,
      harpKeyId,
      activeIds: newActiveDegreeIds,
    }

    return {
      activeHarpStrata: getHarpStrata(newHarpStrataProps),
      bufferedActivityToggles: [],
    }
  })

  // The dispatch seems to function just
  // fine without the batch wrapper, except
  // when it's being called from a `setTimeout`
  // function, which is something we use quite
  // frequently in this project. I wonder
  // whether this is something to do with a
  // failure to operate properly from async
  // contexts. This could use investigation.
  // Possibly if I were actually returning
  // a Promise here rather than a function
  // which runs the Promise then things would
  // work better. Lots to consider, but this
  // at least appears to work well.
  return () => {
    unstable_batchedUpdates(() => {
      updateActiveHarpStrata()
    })
  }
}
