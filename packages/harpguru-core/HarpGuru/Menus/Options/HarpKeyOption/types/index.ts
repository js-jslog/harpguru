import type { HarpStrata } from 'harpstrata'

import type { SetActiveHarpStrata } from '../../../../HarpGuru'
import type { DisplayModes } from '../../../../HarpFace'

export type HarpKeyOptionProps = {
  readonly activeHarpStrata: HarpStrata
  readonly setActiveHarpStrata: SetActiveHarpStrata
  readonly activeDisplayMode: DisplayModes
}
