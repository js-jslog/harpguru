import { useGlobal, useDispatch } from 'reactn'

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

  return () => {
    updateActiveHarpStrata()
  }
}
