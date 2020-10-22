import { useGlobal } from 'reactn'
import { useEffect } from 'react'
import type { HarpStrataProps } from 'harpstrata'
import { getHarpStrata } from 'harpstrata'

import { batchToggleDegreeIds } from '../../utils'

export const useFlushBatchIdToggles = (): void => {
  const [batchIdToggleBuffer] = useGlobal('toggleDegreeIdsBuffer')
  const [activeHarpStrata, setActiveHarpStrata] = useGlobal('activeHarpStrata')

  useEffect(() => {
    const flushBufferedToggles = setTimeout(() => {
      const {
        apparatus: { id: apparatusId },
        pozitionId,
        harpKeyId,
        isActiveComplex: { activeDegreeIds },
      } = activeHarpStrata
      const newActiveDegreeIds = batchToggleDegreeIds(
        activeDegreeIds,
        batchIdToggleBuffer
      )
      const newHarpStrataProps: HarpStrataProps = {
        apparatusId,
        pozitionId,
        harpKeyId,
        activeIds: newActiveDegreeIds,
      }
      setActiveHarpStrata(getHarpStrata(newHarpStrataProps))
    }, 1000)
    return () => {
      clearTimeout(flushBufferedToggles)
    }
  }, [batchIdToggleBuffer])
}
