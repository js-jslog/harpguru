import type { DisplayModeOptionProps } from '../types'
import { DisplayModes } from '../../../../types'

export const nudgeDisplayMode = (
  partialParams: DisplayModeOptionProps
): void => {
  const { activeDisplayMode, setActiveDisplayMode } = partialParams

  if (activeDisplayMode === DisplayModes.Degree) {
    setActiveDisplayMode(DisplayModes.Pitch)
  } else {
    setActiveDisplayMode(DisplayModes.Degree)
  }
}
