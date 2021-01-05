import { useDispatch } from 'reactn'
import { unstable_batchedUpdates } from 'react-native'
import type { HarpStrataProps, HarpStrata } from 'harpstrata'
import { getHarpStrata } from 'harpstrata'
import type { DegreeIds } from 'harpparts'

// TODO: obviously this is not the right place to import this from
import type { GlobalState } from '../../types'
import { batchToggleDegreeIds } from '../../components/toggle-buffer-flusher/utils'

const flushBufferedActivityToggles = (
  updateActiveHarpStrata: (arg0: ReadonlyArray<DegreeIds>) => void,
  emptyBufferedToggles: () => void,
  bufferedActivityToggles: ReadonlyArray<DegreeIds>
): void => {
  if (bufferedActivityToggles.length === 0) return

  // The use of batched updates is absolutely essential here.
  // There are multiple problems, currently with no other solution:

  // 1. The initial load of the app takes 3 times as long.
  // Presumably this is because it takes 3 times as long to
  // run these updates when not done in batch. That might be
  // because each is producing it's own set of rerenders, and
  // may result in wasted, unviewed renders.

  // 2. The `activeHarpStrata` update must be made *after* the
  // resetting of the `bufferedActivityToggles`, otherwise the
  // scale flash notification component operate at all.
  // This makes sense on face value, given the speculation in
  // the previous point above. However, I've made a reproducable
  // I've got an incomplete theory about why that is following
  // observation which adds some mystery to this which is that
  // the `usePrevious` hook in the scale notification component
  // fails to return a different value to the *current* value on
  // each render. Possibly what's happening is something like
  // the `usePrevious` is *seeing* each update to the variables,
  // but is only getting to render on the second one because they
  // happen in such quick succession. Very speculative and I'd be
  // interested to discover the truth.

  // It is also a complete mystery why this problem was introduced at
  // commit 9a2d523b43741ae3bf44b390b3371cb3a7d38a08 when only the
  // quiz cycle component was modified there and the problem isn't
  // resolved if you remove that component from the app entirely..
  // It's an even bigger surprise when you consider that the previous
  // commit at 49c0e580d532a675586be6e4880b5ab31251594b removed the
  // batch processing from this toggle flush hook, which seems like
  // something which would be much more likely to be the cause of
  // such an issue.
  unstable_batchedUpdates(() => {
    emptyBufferedToggles()
    updateActiveHarpStrata(bufferedActivityToggles)
  })
}

export const useFlushBufferedActivityToggles = (): ((
  arg0: ReadonlyArray<DegreeIds>
) => void) => {
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

  return (bufferedActivityToggles) =>
    flushBufferedActivityToggles(
      updateActiveHarpStrata,
      emptyBufferedToggles,
      bufferedActivityToggles
    )
}

export const useFlushBufferedActivityTogglesSingleDispatch = (): (() => void) => {
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

  return () => updateActiveHarpStrata()
}
