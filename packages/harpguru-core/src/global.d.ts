import 'reactn'
import type { HarpStrata, DegreeIds } from 'harpstrata'

import type { CovariantMembers } from './packages/covariance-series'

import type { DisplayModes, ExperienceModes } from './types'

declare module 'reactn/default' {
  export interface State {
    activeHarpStrata: HarpStrata
    activeExperienceMode: ExperienceModes
    activeDisplayMode: DisplayModes
    lockedCovariant: CovariantMembers
    bufferedActivityToggles: ReadonlyArray<DegreeIds>
  }
}
