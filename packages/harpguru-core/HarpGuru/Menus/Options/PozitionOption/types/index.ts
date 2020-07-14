import type { HarpStrata } from 'harpstrata'

import type { SetActiveHarpStrata, DisplayModes } from '../../../../types'

export type PozitionOptionProps = {
  readonly activeHarpStrata: HarpStrata
  readonly setActiveHarpStrata: SetActiveHarpStrata
  readonly activeDisplayMode: DisplayModes
}
