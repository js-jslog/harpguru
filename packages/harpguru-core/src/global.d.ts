import 'reactn'
import type { HarpStrata } from 'harpstrata'
import type {
  Degree,
  DegreeIds,
  HarpFaceMatrix,
  Interaction,
  Pitch,
  PitchIds,
  PozitionIds,
  TuningIds,
  ValvingIds,
} from 'harpparts'

import type {
  ColumnBounds,
  DisplayModes,
  ExperienceModes,
  FlushChannels,
  LayoutFacts,
} from './types'

declare module 'reactn/default' {
  export interface State {
    readonly activeHarpStrata: HarpStrata
    readonly activeExperienceMode: ExperienceModes
    readonly activeDisplayMode: DisplayModes
    readonly bufferedActivityToggles: ReadonlyArray<DegreeIds>
    readonly fragmentHarpFaceByOctaves: boolean
    readonly flushChannel: FlushChannels
    readonly activeQuizDegrees: ReadonlyArray<DegreeIds>
    readonly sourceColumnBounds: ColumnBounds
    readonly columnBounds: ColumnBounds
    readonly tuningId: TuningIds
    readonly valvingId: ValvingIds
    readonly activeInteractionMatrix: HarpFaceMatrix<Interaction>
    readonly activeDegreeMatrix: HarpFaceMatrix<Degree>
    readonly activePitchMatrix: HarpFaceMatrix<Pitch>
    readonly activeDegreeIds: ReadonlyArray<DegreeIds>
    readonly activePitchIds: ReadonlyArray<PitchIds>
    readonly pozitionId: PozitionIds
    readonly rootPitchId: PitchIds
    readonly harpKeyId: PitchIds
    readonly viewableInteractionMatrix: HarpFaceMatrix<Interaction>
    readonly viewableDegreeMatrix: HarpFaceMatrix<Degree>
    readonly viewablePitchMatrix: HarpFaceMatrix<Pitch>
    readonly layoutFacts: LayoutFacts
  }
}
