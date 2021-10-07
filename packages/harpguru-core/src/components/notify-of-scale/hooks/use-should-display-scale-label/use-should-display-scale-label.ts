import { useGlobal } from 'reactn'
import { useEffect, useState } from 'react'

import { ExperienceModes } from '../../../../types'
import { usePrevious } from '../../../../hooks'

export const useShouldDisplayScaleLabel = (
  scaleLabel: string | undefined,
  isScalesMenu: boolean
): boolean => {
  const previousScaleLabel = usePrevious(scaleLabel, undefined)
  const [shouldDisplay, setShouldDisplay] = useState(false)
  const [activeExperienceMode] = useGlobal('activeExperienceMode')

  const isNewScale = scaleLabel !== previousScaleLabel

  useEffect(() => {
    if (isScalesMenu) return setShouldDisplay(false)
    if (activeExperienceMode === ExperienceModes.Quiz)
      return setShouldDisplay(false)
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
  }, [
    isNewScale,
    scaleLabel,
    shouldDisplay,
    activeExperienceMode,
    isScalesMenu,
  ])

  return shouldDisplay
}
