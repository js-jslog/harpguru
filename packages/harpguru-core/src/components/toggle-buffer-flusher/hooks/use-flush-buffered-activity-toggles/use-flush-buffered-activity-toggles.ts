import { useGlobal, useDispatch } from 'reactn'
import { useEffect, useState } from 'react'
import type { HarpStrataProps } from 'harpstrata'
import { getHarpStrata } from 'harpstrata'

import { batchToggleDegreeIds } from '../../utils'
import type { GlobalState } from '../../../../types'

export const useFlushBufferedActivityToggles = (): [
  (arg0: boolean) => void,
  (arg0: false | number) => void
] => {
  const [bufferedActivityToggles] = useGlobal('bufferedActivityToggles')
  const [isOverridden, setIsOverridden] = useState<boolean>(false)
  const [shouldForceFlush, setShouldForceFlush] = useState<false | number>(
    false
  )

  const flushBufferedToggles = useDispatch(
    ({
      bufferedActivityToggles,
      activeHarpStrata,
    }: Pick<GlobalState, 'bufferedActivityToggles' | 'activeHarpStrata'>):
      | undefined
      | Pick<GlobalState, 'bufferedActivityToggles' | 'activeHarpStrata'> => {
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
        bufferedActivityToggles: [],
        activeHarpStrata: getHarpStrata(newHarpStrataProps),
      }
    }
  )

  useEffect(() => {
    if (!isOverridden) return
    if (shouldForceFlush === false) return
    flushBufferedToggles()
    setShouldForceFlush(false)
  }, [isOverridden, shouldForceFlush])

  useEffect(() => {
    if (isOverridden) return
    const regularFlushBufferedToggles = setTimeout(() => {
      flushBufferedToggles()
    }, 1000)
    return () => {
      clearTimeout(regularFlushBufferedToggles)
    }
  }, [bufferedActivityToggles, isOverridden])

  return [setIsOverridden, setShouldForceFlush]
}
