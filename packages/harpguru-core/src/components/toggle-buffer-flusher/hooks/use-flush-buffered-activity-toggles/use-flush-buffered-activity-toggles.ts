import { useGlobal } from 'reactn'
import { unstable_batchedUpdates } from 'react-native'
import { useEffect, useState } from 'react'
import type { HarpStrata, HarpStrataProps } from 'harpstrata'
import { getHarpStrata } from 'harpstrata'
import type { DegreeIds } from 'harpparts'

import { batchToggleDegreeIds } from '../../utils'

export const useFlushBufferedActivityToggles = (): [
  (arg0: boolean) => void,
  (arg0: boolean) => void
] => {
  const [bufferedActivityToggles, setBufferedActivityToggles] = useGlobal(
    'bufferedActivityToggles'
  )
  const [activeHarpStrata, setActiveHarpStrata] = useGlobal('activeHarpStrata')
  const [isOverridden, setIsOverridden] = useState<boolean>(false)
  const [shouldForceFlush, setShouldForceFlush] = useState<boolean>(false)

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
    if (!isOverridden) return
    if (!shouldForceFlush) return
    const overriddenFlushBufferedToggles = setTimeout(() => {
      flushBufferedToggles(
        bufferedActivityToggles,
        setBufferedActivityToggles,
        activeHarpStrata,
        setActiveHarpStrata
      )
      setShouldForceFlush(false)
    }, 500)
    return () => {
      clearTimeout(overriddenFlushBufferedToggles)
    }
  }, [
    bufferedActivityToggles,
    setBufferedActivityToggles,
    setActiveHarpStrata,
    activeHarpStrata,
    isOverridden,
    shouldForceFlush,
  ])

  useEffect(() => {
    if (isOverridden) return
    const regularFlushBufferedToggles = setTimeout(() => {
      flushBufferedToggles(
        bufferedActivityToggles,
        setBufferedActivityToggles,
        activeHarpStrata,
        setActiveHarpStrata
      )
    }, 1000)
    return () => {
      clearTimeout(regularFlushBufferedToggles)
    }
  }, [
    bufferedActivityToggles,
    setBufferedActivityToggles,
    setActiveHarpStrata,
    activeHarpStrata,
    isOverridden,
    shouldForceFlush,
  ])

  return [setIsOverridden, setShouldForceFlush]
}
