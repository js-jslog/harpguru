import { useGlobal } from 'reactn'
import { unstable_batchedUpdates } from 'react-native'
import { useEffect } from 'react'
import type { HarpStrataProps } from 'harpstrata'
import { getHarpStrata } from 'harpstrata'

import { batchToggleDegreeIds } from '../../utils'

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
      const newActiveDegreeIds = batchToggleDegreeIds(
        activeDegreeIds,
        bufferedActivityToggles
      )
      const newHarpStrataProps: HarpStrataProps = {
        apparatusId,
        pozitionId,
        harpKeyId,
        activeIds: newActiveDegreeIds,
      }
      unstable_batchedUpdates(() => {
        setActiveHarpStrata(getHarpStrata(newHarpStrataProps))
        setBufferedActivityToggles([])
      })
    }, 1000)
    return () => {
      clearTimeout(flushBufferedToggles)
    }
  }, [
    bufferedActivityToggles,
    setBufferedActivityToggles,
    setActiveHarpStrata,
    activeHarpStrata,
  ])
}
