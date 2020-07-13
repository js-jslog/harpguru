import type { SetActiveDisplayMode } from '../../../../HarpGuru'
import type { DisplayModes } from '../../../../HarpFace'

export type DisplayModeOptionProps = {
  readonly activeDisplayMode: DisplayModes
  readonly setActiveDisplayMode: SetActiveDisplayMode
}
