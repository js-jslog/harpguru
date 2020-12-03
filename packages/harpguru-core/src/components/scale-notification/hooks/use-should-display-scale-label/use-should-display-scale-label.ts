import { useGlobal } from 'reactn'
import { useEffect, useState } from 'react'

import { ExperienceModes } from '../../../../types'
import { usePrevious } from '../../../../hooks'

export const useShouldDisplayScaleLabel = (
  scaleLabel: string | undefined
): boolean => {
  const previousScaleLabel = usePrevious(scaleLabel, scaleLabel)
  const [shouldDisplay, setShouldDisplay] = useState(false)
  const [activeExperienceMode] = useGlobal('activeExperienceMode')

  if (activeExperienceMode === ExperienceModes.Quiz) return false

  const isNewScale = scaleLabel !== previousScaleLabel

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

  return shouldDisplay
}
