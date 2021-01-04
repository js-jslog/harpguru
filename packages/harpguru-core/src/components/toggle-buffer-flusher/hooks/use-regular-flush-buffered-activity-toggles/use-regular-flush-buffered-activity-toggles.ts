import { useGlobal } from 'reactn'
import { useEffect } from 'react'

import { useFlushBufferedActivityToggles } from '../../../../hooks'

export const useRegularFlushBufferedToggles = (): void => {
  const [isOverridden] = useGlobal('isOverridden')
  const [bufferedActivityToggles] = useGlobal('bufferedActivityToggles')
  const flushBufferedActivityToggles = useFlushBufferedActivityToggles()

  useEffect(() => {
    if (isOverridden) return
    const regularFlushBufferedToggles = setTimeout(() => {
      flushBufferedActivityToggles(bufferedActivityToggles)
    }, 1000)
    return () => {
      clearTimeout(regularFlushBufferedToggles)
    }
  }, [bufferedActivityToggles, isOverridden])
}
