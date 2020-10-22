import { useGlobal, useDispatch } from 'reactn'
import { useEffect } from 'react'

export const useFlushBatchIdToggles = (): void => {
  const [batchIdToggleBuffer] = useGlobal('toggleDegreeIdsBuffer')
  const updateHarpStrataAndFlushBuffer = useDispatch(
    'updateHarpStrataAndFlushBuffer'
  )

  useEffect(() => {
    const flushBufferedToggles = setTimeout(() => {
      if (batchIdToggleBuffer.length == 0) return
      updateHarpStrataAndFlushBuffer()
    }, 500)
    return () => {
      clearTimeout(flushBufferedToggles)
    }
  }, [batchIdToggleBuffer])
}
