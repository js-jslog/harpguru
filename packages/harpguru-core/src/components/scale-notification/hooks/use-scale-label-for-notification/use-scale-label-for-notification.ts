import { useGlobal } from 'reactn'
import { useEffect, useState } from 'react'

import { doScalesMatch, getScaleLabel } from '../../utils'
import { usePrevious } from '../../../../hooks'

export const useScaleLabelForNotification = (): string | undefined => {
  const [activeHarpStrata] = useGlobal('activeHarpStrata')
  const { activeDegreeIds } = activeHarpStrata
  const previousActiveDegreeIds = usePrevious(activeDegreeIds, activeDegreeIds)

  const [shouldDisplay, setShouldDisplay] = useState(false)

  const isNewScale =
    previousActiveDegreeIds === undefined
      ? false
      : !doScalesMatch(activeDegreeIds, previousActiveDegreeIds)

  const scaleLabel = getScaleLabel(activeDegreeIds)

  useEffect(() => {
    if (scaleLabel === undefined) return
    if (isNewScale === true) {
      setShouldDisplay(true)
      const finishShowing = setTimeout(() => {
        setShouldDisplay(false)
      }, 500)
      return () => clearTimeout(finishShowing)
    }
    if (isNewScale === false && shouldDisplay === true) {
      const finishShowing = setTimeout(() => {
        setShouldDisplay(false)
      }, 500)
      return () => clearTimeout(finishShowing)
    }
    return
  }, [isNewScale, scaleLabel, shouldDisplay])

  if (shouldDisplay === true) return scaleLabel
  return undefined
}
