import type { SetActiveDisplayMode, DisplayModes } from '../../../../types'

export type DisplayModeOptionProps = {
  readonly activeDisplayMode: DisplayModes
  readonly setActiveDisplayMode: SetActiveDisplayMode
}
