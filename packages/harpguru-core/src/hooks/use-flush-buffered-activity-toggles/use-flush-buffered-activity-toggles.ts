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
      apparatus: { id: apparatusId },
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

  return () => {
    unstable_batchedUpdates(() => {
      updateActiveHarpStrata()
    })
  }
}
