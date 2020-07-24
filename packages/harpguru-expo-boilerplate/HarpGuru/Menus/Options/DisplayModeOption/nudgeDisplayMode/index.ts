import { DisplayModes } from '../../../../types'

type Props = {
  readonly activeDisplayMode: DisplayModes
  readonly setActiveDisplayMode: (arg0: DisplayModes) => void
}

export const nudgeDisplayMode = (partialParams: Props): void => {
  const { activeDisplayMode, setActiveDisplayMode } = partialParams

  if (activeDisplayMode === DisplayModes.Degree) {
    setActiveDisplayMode(DisplayModes.Pitch)
  } else {
    setActiveDisplayMode(DisplayModes.Degree)
  }
}
