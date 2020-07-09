import type { HarpStrata } from 'harpstrata'

import type { SetActiveHarpStrata, SetActiveDisplayMode } from '../../HarpGuru'
import type { DisplayModes } from '../../HarpFace'

export type MenuProps = {
  readonly activeHarpStrata: HarpStrata,
  readonly setActiveHarpStrata: SetActiveHarpStrata
  readonly activeDisplayMode: DisplayModes
  readonly setActiveDisplayMode: SetActiveDisplayMode
}
