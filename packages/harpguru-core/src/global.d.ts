import 'reactn'
import type { HarpStrata } from 'harpstrata'
import type {
  Degree,
  DegreeIds,
  HarpFaceMatrices,
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
    readonly activeInteractionMatrix: HarpFaceMatrices<Interaction>
    readonly activeDegreeMatrix: HarpFaceMatrices<Degree>
    readonly activePitchMatrix: HarpFaceMatrices<Pitch>
    readonly activeDegreeIds: ReadonlyArray<DegreeIds>
    readonly activePitchIds: ReadonlyArray<PitchIds>
    readonly pozitionId: PozitionIds
    readonly rootPitchId: PitchIds
    readonly harpKeyId: PitchIds
    readonly viewableInteractionMatrix: HarpFaceMatrices<Interaction>
    readonly viewableDegreeMatrix: HarpFaceMatrices<Degree>
    readonly viewablePitchMatrix: HarpFaceMatrices<Pitch>
    // TODO: It would be nice to have a type which is more in keeping with the
    // HarpFaceMatrices type. Perhaps that should be genericised further?
    readonly layoutFacts: readonly [LayoutFacts, LayoutFacts]
  }
}
