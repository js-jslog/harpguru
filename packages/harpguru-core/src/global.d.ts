import 'reactn'
import type { HarpStrata } from 'harpstrata'
import type { DegreeIds } from 'harpparts'
import type { CovariantMembers } from 'harpcovariance'

import type { DisplayModes, ExperienceModes, FlushChannels } from './types'

declare module 'reactn/default' {
  export interface State {
    activeHarpStrata: HarpStrata
    activeExperienceMode: ExperienceModes
    activeDisplayMode: DisplayModes
    lockedCovariant: CovariantMembers
    bufferedActivityToggles: ReadonlyArray<DegreeIds>
    fragmentHarpFaceByOctaves: boolean
    flushChannel: FlushChannels
  }
}
