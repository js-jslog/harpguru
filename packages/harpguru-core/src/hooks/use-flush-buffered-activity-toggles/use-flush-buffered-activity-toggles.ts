import { useGlobal, useDispatch } from 'reactn'
import { unstable_batchedUpdates } from 'react-native'

import { reduceForNewHarpStrataByToggleFlush } from './reduce-for-new-harpstrata-by-toggle-flush'

export const useFlushBufferedActivityToggles = (): (() => void) => {
  const [bufferedActivityToggles] = useGlobal('bufferedActivityToggles')
  const updateActiveHarpStrata = useDispatch(
    (activeHarpStrata) =>
      reduceForNewHarpStrataByToggleFlush(
        activeHarpStrata,
        bufferedActivityToggles
      ),
    'activeHarpStrata'
  )

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
