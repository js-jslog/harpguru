import { useGlobal, useDispatch } from 'reactn'
import { useEffect, useState } from 'react'
import type { HarpStrataProps, HarpStrata } from 'harpstrata'
import { getHarpStrata } from 'harpstrata'
import type { DegreeIds } from 'harpparts'

import { batchToggleDegreeIds } from '../../utils'

export const useFlushBufferedActivityToggles = (): [
  (arg0: boolean) => void,
  (arg0: false | number) => void
] => {
  const [bufferedActivityToggles] = useGlobal('bufferedActivityToggles')
  const [isOverridden, setIsOverridden] = useState<boolean>(false)
  const [shouldForceFlush, setShouldForceFlush] = useState<false | number>(
    false
  )

  const updateActiveHarpStrata = useDispatch(
    (
      activeHarpStrata: HarpStrata,
      bufferedActivityToggles: ReadonlyArray<DegreeIds>
    ): HarpStrata => {
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
      return getHarpStrata(newHarpStrataProps)
    },
    'activeHarpStrata'
  )

  const emptyBufferedToggles = useDispatch(
    (): [] => [],
    'bufferedActivityToggles'
  )

  const flushBufferedToggles = (
    bufferedActivityToggles: ReadonlyArray<DegreeIds>
  ) => {
    if (bufferedActivityToggles.length === 0) return
    // It is essential that the harpstrata update is the last thing to
    // happen. Otherwise the scale notification flash won't happen. I
    // think this might be because the `usePrevious` hook in that
    // component is somehow missing a step in it's history and not
    // seeing the change. You can test this by printing out the
    // current and previous scale label values each time it renders.

    // It is a complete mystery why this problem was introduced at
    // commit 9a2d523b43741ae3bf44b390b3371cb3a7d38a08 when only the
    // quiz cycle component was modified there and the problem isn't
    // resolved if you remove that component from the app entirely..
    // It's an even bigger surprise when you consider that the previous
    // commit at 49c0e580d532a675586be6e4880b5ab31251594b removed the
    // batch processing from this toggle flush hook, which seems like
    // something which would be much more likely to be the cause of
    // such an issue.
    emptyBufferedToggles()
    updateActiveHarpStrata(bufferedActivityToggles)
  }

  useEffect(() => {
    if (!isOverridden) return
    if (shouldForceFlush === false) return
    flushBufferedToggles(bufferedActivityToggles)
    return setShouldForceFlush(false)
  }, [bufferedActivityToggles, isOverridden, shouldForceFlush])

  useEffect(() => {
    if (isOverridden) return
    const regularFlushBufferedToggles = setTimeout(() => {
      flushBufferedToggles(bufferedActivityToggles)
    }, 1000)
    return () => {
      clearTimeout(regularFlushBufferedToggles)
    }
  }, [bufferedActivityToggles, isOverridden])

  return [setIsOverridden, setShouldForceFlush]
}
