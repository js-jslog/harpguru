import { useGlobal } from 'reactn'
import { useEffect } from 'react'

import { useFlushBufferedActivityTogglesSingleDispatch } from '../../../../hooks'

export const useRegularFlushBufferedToggles = (): void => {
  const [isOverridden] = useGlobal('isOverridden')
  const [bufferedActivityToggles] = useGlobal('bufferedActivityToggles')
  const flushBufferedActivityToggles = useFlushBufferedActivityTogglesSingleDispatch()

  useEffect(() => {
    if (isOverridden) return
    const regularFlushBufferedToggles = setTimeout(() => {
      flushBufferedActivityToggles()
    }, 1000)
    return () => {
      clearTimeout(regularFlushBufferedToggles)
    }
  }, [bufferedActivityToggles, isOverridden])
}
