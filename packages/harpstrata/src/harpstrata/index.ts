export type { HarpStrataProps, HarpStrata } from './HarpStrata'
export { getApparatusIds, getPozitionIds, getPitchIds, getDegreeIds, getHarpStrata } from './HarpStrata'

export { ApparatusIds, InteractionIds } from './Apparatus'
export type {
  Apparatus,
  Interaction, InteractionRow, InteractionMatrix,
  HalfstepIndex , HalfstepIndexRow, HalfstepIndexMatrix,
} from './Apparatus'

export { DegreeIds } from './Degree'
export type { Degree, DegreeRow, DegreeMatrix } from './Degree'

export { PozitionIds } from './Pozition'
export type { Pozition } from './Pozition'
export { isPozitionId } from './Pozition'

export { PitchIds } from './Pitch'
export type { Pitch, NaturalPitch, UnnaturalPitch } from './Pitch'
export { isPitchId, isNaturalPitch } from './Pitch'

export { getCovariantSet } from './Covariant'
export type {
  CovariantSet, CovariantControllers,
  HarpKeyControllers, RootPitchControllers, PozitionControllers
} from './Covariant'
export { areHarpKeyControllers, arePozitionControllers, areRootPitchControllers } from './Covariant'

export { IsActiveIds } from './IsActive'
export type {
  ActiveDegreeIds, ActivePitchIds, ActiveIds,
  IsActiveMatrix , IsActiveRow   , IsActiveComplex
} from './IsActive'
