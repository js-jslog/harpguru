import type { HarpStrata } from 'harpstrata'

import type { SetActiveHarpStrata } from '../../../../types'

export type ApparatusOptionProps = {
  readonly activeHarpStrata: HarpStrata
  readonly setActiveHarpStrata: SetActiveHarpStrata
}
