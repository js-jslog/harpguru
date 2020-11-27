import type {
  Degree,
  DegreeIds,
  Pitch,
  PitchIds,
  HarpFaceMatrix,
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
