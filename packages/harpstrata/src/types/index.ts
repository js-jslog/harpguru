import type {
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

export type HarpStrataProps = {
  readonly tuningId: TuningIds
  readonly valvingId: ValvingIds
  readonly pozitionId: PozitionIds
  readonly harpKeyId: PitchIds
  readonly activeIds: ReadonlyArray<DegreeIds> | ReadonlyArray<PitchIds>
}

export type HarpStrata = {
  readonly apparatus: Apparatus
  readonly degreeMatrix: HarpFaceMatrices<Degree>
  readonly pitchMatrix: HarpFaceMatrices<Pitch>
  readonly activeDegreeIds: ReadonlyArray<DegreeIds>
  readonly activePitchIds: ReadonlyArray<PitchIds>
  readonly pozitionId: PozitionIds
  readonly rootPitchId: PitchIds
  readonly harpKeyId: PitchIds
}
