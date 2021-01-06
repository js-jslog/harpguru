import { useGlobal } from 'reactn'
import { useEffect } from 'react'

import { FlushChannels } from '../../../../types'
import { useFlushBufferedActivityTogglesSingleDispatch } from '../../../../hooks'

export const useRegularFlushBufferedToggles = (): void => {
  const [flushChannel] = useGlobal('flushChannel')
  const [bufferedActivityToggles] = useGlobal('bufferedActivityToggles')
  const flushBufferedActivityToggles = useFlushBufferedActivityTogglesSingleDispatch()

  useEffect(() => {
    if (flushChannel === FlushChannels.Regular) return
    const regularFlushBufferedToggles = setTimeout(() => {
      flushBufferedActivityToggles()
    }, 1000)
    return () => {
      clearTimeout(regularFlushBufferedToggles)
    }
  }, [bufferedActivityToggles, flushChannel])
}
