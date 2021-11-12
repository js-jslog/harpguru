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
    readonly activeInteractionMatrix: readonly [HarpFaceMatrix<Interaction>, HarpFaceMatrix<Interaction>]
    readonly activeDegreeMatrix: readonly [HarpFaceMatrix<Degree>, HarpFaceMatrix<Degree>]
    readonly activePitchMatrix: readonly [HarpFaceMatrix<Pitch>, HarpFaceMatrix<Pitch>]
    readonly activeDegreeIds: ReadonlyArray<DegreeIds>
    readonly activePitchIds: ReadonlyArray<PitchIds>
    readonly pozitionId: PozitionIds
    readonly rootPitchId: PitchIds
    readonly harpKeyId: PitchIds
    readonly viewableInteractionMatrix: readonly [HarpFaceMatrix<Interaction>, HarpFaceMatrix<Interaction>]
    readonly viewableDegreeMatrix: readonly [HarpFaceMatrix<Degree>, HarpFaceMatrix<Degree>]
    readonly viewablePitchMatrix: readonly [HarpFaceMatrix<Pitch>, HarpFaceMatrix<Pitch>]
    readonly layoutFacts: readonly [LayoutFacts, LayoutFacts]
  }
}
