import type {
  HarpFaceMatrix,
  Apparatus,
  TuningIds,
  Degree,
  DegreeIds,
  PitchIds,
  Pitch,
  PozitionIds,
  ValvingIds,
  HarpFaceMatrices,
} from 'harpparts'

type ActiveDegreeIds = ReadonlyArray<DegreeIds>
type ActivePitchIds = ReadonlyArray<PitchIds>
export type ActiveIds = ActivePitchIds | ActiveDegreeIds

export type ActiveIdsPair = {
  readonly activeDegreeIds: ActiveDegreeIds
  readonly activePitchIds: ActivePitchIds
}

export type IsActiveProps = {
  degreeMatrix: HarpFaceMatrix<Degree>
  pitchMatrix: HarpFaceMatrix<Pitch>
  activeIds: ActiveIds
}

export type HarpStrataProps = {
  readonly tuningId: TuningIds
  readonly valvingId: ValvingIds
  readonly pozitionId: PozitionIds
  readonly harpKeyId: PitchIds
  readonly activeIds: ActiveIds
}

export type HarpStrata = {
  readonly apparatus: Apparatus
  readonly degreeMatrix: HarpFaceMatrices<Degree>
  readonly pitchMatrix: HarpFaceMatrices<Pitch>
  readonly activeDegreeIds: ActiveDegreeIds
  readonly activePitchIds: ActivePitchIds
  readonly pozitionId: PozitionIds
  readonly rootPitchId: PitchIds
  readonly harpKeyId: PitchIds
}
