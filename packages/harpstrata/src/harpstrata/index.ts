export type { HarpStrataProps, HarpStrata } from './HarpStrata'
export {
  getApparatusIds,
  getPitchIds,
  getDegreeIds,
  getHarpStrata,
} from './HarpStrata'

export { ApparatusIds, InteractionIds } from './Apparatus'
export type {
  Apparatus,
  Interaction,
  InteractionRow,
  InteractionMatrix,
  HalfstepIndex,
  HalfstepIndexRow,
  HalfstepIndexMatrix,
} from './Apparatus'

export type { Degree, DegreeRow, DegreeMatrix } from './Degree'

export { PitchIds, getPitch } from './Pitch'
export type { Pitch, NaturalPitch, UnnaturalPitch } from './Pitch'
export { isPitchId, isNaturalPitch } from './Pitch'

export { getCovariantSet } from './Covariant'
export type {
  CovariantSet,
  CovariantControllers,
  HarpKeyControllers,
  RootPitchControllers,
  PozitionControllers,
} from './Covariant'
export {
  areHarpKeyControllers,
  arePozitionControllers,
  areRootPitchControllers,
} from './Covariant'

export type { ActiveDegreeIds, ActivePitchIds, ActiveIds } from './IsActive'
