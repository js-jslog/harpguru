import { useGlobal } from 'reactn'

import { partiallyApplyNudgeFunction } from '../../../../utils'
import { ExperienceModes } from '../../../../types'

export const useNudgeExperienceMode = (): ((arg0: 'UP' | 'DOWN') => void) => {
  const [activeExperienceMode, setActiveExperienceMode] = useGlobal(
    'activeExperienceMode'
  )

  return partiallyApplyNudgeFunction(nudgeExperienceMode, {
    activeExperienceMode,
    setActiveExperienceMode,
  })
}

type PartialParams = {
  readonly activeExperienceMode: ExperienceModes
  readonly setActiveExperienceMode: (arg0: ExperienceModes) => void
}

const nudgeExperienceMode = (partialParams: PartialParams): void => {
  const { activeExperienceMode, setActiveExperienceMode } = partialParams

  if (activeExperienceMode === ExperienceModes.Quiz) {
    setActiveExperienceMode(ExperienceModes.Explore)
  } else {
    setActiveExperienceMode(ExperienceModes.Quiz)
  }
}
