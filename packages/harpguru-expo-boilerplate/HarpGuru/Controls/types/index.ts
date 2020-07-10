import type { HarpStrata } from 'harpstrata'

import type { SetActiveHarpStrata } from '../../HarpGuru'

export type HarpStrataControlProps = {
  readonly activeHarpStrata: HarpStrata
  readonly setActiveHarpStrata: SetActiveHarpStrata
}
