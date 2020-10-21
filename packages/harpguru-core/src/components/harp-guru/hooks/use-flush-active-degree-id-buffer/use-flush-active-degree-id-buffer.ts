import { useGlobal } from 'reactn'
import { useEffect } from 'react'
import type { HarpStrataProps } from 'harpstrata'
import { getHarpStrata } from 'harpstrata'

export const useFlushActiveDegreeIdBuffer = (): void => {
  const [activeDegreeIdBuffer] = useGlobal('activeDegreeIdBuffer')
  const [activeHarpStrata, setActiveHarpStrata] = useGlobal('activeHarpStrata')

  useEffect(() => {
    const flushBufferedActivations = setTimeout(() => {
      const {
        apparatus: { id: apparatusId },
        pozitionId,
        harpKeyId,
      } = activeHarpStrata
      const newHarpStrataProps: HarpStrataProps = {
        apparatusId,
        pozitionId,
        harpKeyId,
        activeIds: activeDegreeIdBuffer,
      }
      setActiveHarpStrata(getHarpStrata(newHarpStrataProps))
    }, 1000)
    return () => {
      clearTimeout(flushBufferedActivations)
    }
  }, [activeDegreeIdBuffer])
}
