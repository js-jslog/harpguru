import { useGlobal } from 'reactn'

import { partiallyApplyNudgeFunction } from '../../../../utils'
import { DisplayModes } from '../../../../types'

export const useNudgeDisplayMode = (): ((arg0: 'UP' | 'DOWN') => void) => {
  const [activeDisplayMode, setActiveDisplayMode] = useGlobal(
    'activeDisplayMode'
  )

  return partiallyApplyNudgeFunction(nudgeDisplayMode, {
    activeDisplayMode,
    setActiveDisplayMode,
  })
}

type PartialParams = {
  readonly activeDisplayMode: DisplayModes
  readonly setActiveDisplayMode: (arg0: DisplayModes) => void
}

const nudgeDisplayMode = (partialParams: PartialParams): void => {
  const { activeDisplayMode, setActiveDisplayMode } = partialParams

  if (activeDisplayMode === DisplayModes.Degree) {
    setActiveDisplayMode(DisplayModes.Pitch)
  } else {
    setActiveDisplayMode(DisplayModes.Degree)
  }
}
