import type { HarpStrata } from 'harpstrata'

import type { SetActiveHarpStrata, SetActiveDisplayMode } from '../../HarpGuru'
import type { DisplayModes } from '../../HarpFace'

export type ScreenProps = {
  readonly activeHarpStrata: HarpStrata;
  readonly activeDisplayMode: DisplayModes;
  readonly setActiveHarpStrata: SetActiveHarpStrata;
  readonly setActiveDisplayMode: SetActiveDisplayMode;
}
