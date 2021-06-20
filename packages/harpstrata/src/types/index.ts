import type {
  HarpFaceMatrix,
  Apparatus,
  ApparatusIds,
  Degree,
  DegreeIds,
  PitchIds,
  Pitch,
  PozitionIds,
} from 'harpparts'

export type ActiveDegreeIds = ReadonlyArray<DegreeIds>
export type ActivePitchIds = ReadonlyArray<PitchIds>

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
  readonly tuningId: ApparatusIds
  readonly pozitionId: PozitionIds
  readonly harpKeyId: PitchIds
  readonly activeIds: ActiveIds
}

export type HarpStrata = {
  readonly apparatus: Apparatus
  readonly degreeMatrix: HarpFaceMatrix<Degree>
  readonly pitchMatrix: HarpFaceMatrix<Pitch>
  readonly activeDegreeIds: ActiveDegreeIds
  readonly activePitchIds: ActivePitchIds
  readonly pozitionId: PozitionIds
  readonly rootPitchId: PitchIds
  readonly harpKeyId: PitchIds
}
