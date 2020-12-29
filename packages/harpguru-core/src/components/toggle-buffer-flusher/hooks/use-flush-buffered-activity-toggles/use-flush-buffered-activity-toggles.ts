import { useGlobal } from 'reactn'
import { unstable_batchedUpdates } from 'react-native'
import { useEffect, useState } from 'react'
import type { HarpStrata, HarpStrataProps } from 'harpstrata'
import { getHarpStrata } from 'harpstrata'
import type { DegreeIds } from 'harpparts'

import { batchToggleDegreeIds } from '../../utils'

export const useFlushBufferedActivityToggles = (): ((
  arg0: boolean
) => void) => {
  const [bufferedActivityToggles, setBufferedActivityToggles] = useGlobal(
    'bufferedActivityToggles'
  )
  const [activeHarpStrata, setActiveHarpStrata] = useGlobal('activeHarpStrata')
  const [shouldForceFlush, setShouldForceFlush] = useState<boolean>(true)

  const flushBufferedToggles = (
    bufferedActivityTogglesLocal: ReadonlyArray<DegreeIds>,
    setBufferedActivityTogglesLocal: (arg0: ReadonlyArray<DegreeIds>) => void,
    activeHarpStrataLocal: HarpStrata,
    setActiveHarpStrataLocal: (arg0: HarpStrata) => void
  ) => {
    if (bufferedActivityTogglesLocal.length === 0) return
    const {
      apparatus: { id: apparatusId },
      pozitionId,
      harpKeyId,
      activeDegreeIds,
    } = activeHarpStrataLocal
    const newActiveDegreeIds = batchToggleDegreeIds(
      activeDegreeIds,
      bufferedActivityTogglesLocal
    )
    const newHarpStrataProps: HarpStrataProps = {
      apparatusId,
      pozitionId,
      harpKeyId,
      activeIds: newActiveDegreeIds,
    }
    unstable_batchedUpdates(() => {
      setActiveHarpStrataLocal(getHarpStrata(newHarpStrataProps))
      setBufferedActivityTogglesLocal([])
    })
  }

  useEffect(() => {
    if (shouldForceFlush) {
      // The "immediate" flush still requires a short
      // delay so that the user doesn't experience a
      // freeze in feedback if they try to hit multiple
      // cells.
      const immediatelyFlushBufferedToggles = setTimeout(() => {
        flushBufferedToggles(
          bufferedActivityToggles,
          setBufferedActivityToggles,
          activeHarpStrata,
          setActiveHarpStrata
        )
        setShouldForceFlush(false)
      }, 500)
      return () => {
        clearTimeout(immediatelyFlushBufferedToggles)
      }
    }
    const delayedFlushBufferedToggles = setTimeout(() => {
      flushBufferedToggles(
        bufferedActivityToggles,
        setBufferedActivityToggles,
        activeHarpStrata,
        setActiveHarpStrata
      )
    }, 1000)
    return () => {
      clearTimeout(delayedFlushBufferedToggles)
    }
  }, [
    bufferedActivityToggles,
    setBufferedActivityToggles,
    setActiveHarpStrata,
    activeHarpStrata,
    shouldForceFlush,
  ])

  return setShouldForceFlush
}
