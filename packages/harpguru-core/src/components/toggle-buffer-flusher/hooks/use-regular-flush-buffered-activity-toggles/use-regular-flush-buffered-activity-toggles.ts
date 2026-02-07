import { useEffect, useCallback } from 'react'

import { reduceCellToggleBufferToHarpStrata } from '../../../../utils'
import { FlushChannels } from '../../../../types'
import { useHarpGuruStore, useHarpGuruStoreInstance } from '../../../../store'

export const useRegularFlushBufferedToggles = (): void => {
  const flushChannel = useHarpGuruStore((state) => state.flushChannel)
  const bufferedActivityToggles = useHarpGuruStore(
    (state) => state.bufferedActivityToggles
  )
  const store = useHarpGuruStoreInstance()
  const flushBufferedActivityToggles = useCallback(() => {
    store.setState((state) => ({
      activeHarpStrata: reduceCellToggleBufferToHarpStrata(
        state.activeHarpStrata,
        bufferedActivityToggles
      ),
    }))
  }, [store, bufferedActivityToggles])

  useEffect(() => {
    if (flushChannel !== FlushChannels.Regular) return
    const regularFlushBufferedToggles = setTimeout(() => {
      flushBufferedActivityToggles()
    }, 1000)
    return () => {
      clearTimeout(regularFlushBufferedToggles)
    }
  }, [bufferedActivityToggles, flushChannel])
}
