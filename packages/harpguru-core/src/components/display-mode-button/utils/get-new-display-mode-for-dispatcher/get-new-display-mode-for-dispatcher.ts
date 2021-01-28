import { DisplayModes } from '../../../../types'

export const getNewDisplayModeForDispatcher = (
  activeDisplayMode: DisplayModes
): DisplayModes => {
  const { Degree, Pitch } = DisplayModes

  const newDisplayMode = activeDisplayMode === Pitch ? Degree : Pitch

  return newDisplayMode
}
