import { useGlobal } from 'reactn'
import { useEffect } from 'react'
import type { HarpStrataProps } from 'harpstrata'
import { getHarpStrata } from 'harpstrata'

import { batchToggleActiveIds } from '../../utils'

export const useFlushBufferedActivityToggles = (): void => {
  const [bufferedActivityToggles, setBufferedActivityToggles] = useGlobal(
    'bufferedActivityToggles'
  )
  const [activeHarpStrata, setActiveHarpStrata] = useGlobal('activeHarpStrata')

  useEffect(() => {
    const flushBufferedToggles = setTimeout(() => {
      if (bufferedActivityToggles.length === 0) return
      const {
        apparatus: { id: apparatusId },
        pozitionId,
        harpKeyId,
        isActiveComplex: { activeDegreeIds },
      } = activeHarpStrata
      const newActiveDegreeIds = batchToggleActiveIds(
        activeDegreeIds,
        bufferedActivityToggles
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
  }, [bufferedActivityToggles, setBufferedActivityToggles])
}
