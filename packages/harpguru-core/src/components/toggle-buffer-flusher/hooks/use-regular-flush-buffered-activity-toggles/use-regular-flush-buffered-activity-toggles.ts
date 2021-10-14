import { useGlobal, useDispatch } from 'reactn'
import { useEffect } from 'react'

import { reduceCellToggleBufferToHarpStrata } from '../../../../utils'
import { FlushChannels } from '../../../../types'

export const useRegularFlushBufferedToggles = (): void => {
  const [flushChannel] = useGlobal('flushChannel')
  const [bufferedActivityToggles] = useGlobal('bufferedActivityToggles')
  const flushBufferedActivityToggles = useDispatch((activeHarpStrata) => {
    return reduceCellToggleBufferToHarpStrata(
      activeHarpStrata,
      bufferedActivityToggles
    )
  }, 'activeHarpStrata')

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
