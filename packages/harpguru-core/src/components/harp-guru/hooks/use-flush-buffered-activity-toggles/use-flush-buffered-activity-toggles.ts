import { useGlobal } from 'reactn'
import { useEffect } from 'react'
import type { HarpStrataProps } from 'harpstrata'
import { getHarpStrata } from 'harpstrata'

import { batchToggleDegreeIds } from '../../utils'

export const useFlushBufferedActivityToggles = (): void => {
  const [batchActivityToggles, setBufferedActivityToggles] = useGlobal(
    'toggleDegreeIdsBuffer'
  )
  const [activeHarpStrata, setActiveHarpStrata] = useGlobal('activeHarpStrata')

  useEffect(() => {
    const flushBufferedToggles = setTimeout(() => {
      if (batchActivityToggles.length === 0) return
      const {
        apparatus: { id: apparatusId },
        pozitionId,
        harpKeyId,
        isActiveComplex: { activeDegreeIds },
      } = activeHarpStrata
      const newActiveDegreeIds = batchToggleDegreeIds(
        activeDegreeIds,
        batchActivityToggles
      )
      const newHarpStrataProps: HarpStrataProps = {
        apparatusId,
        pozitionId,
        harpKeyId,
        activeIds: newActiveDegreeIds,
      }
      setActiveHarpStrata(getHarpStrata(newHarpStrataProps))
      setBufferedActivityToggles([])
    }, 1000)
    return () => {
      clearTimeout(flushBufferedToggles)
    }
  }, [batchActivityToggles, setBufferedActivityToggles])
}
