import type { PozitionIds, Pozition } from '../../pozition'
import type { PitchIds, Pitch } from '../../pitch'
import type { DegreeIds, Degree } from '../../degree'
import type { ApparatusIds, Apparatus } from '../../apparatus'

export type OrderablePartId = ApparatusIds | DegreeIds | PitchIds | PozitionIds

export type OrderablePartList =
  | Map<ApparatusIds, Apparatus>
  | Map<DegreeIds, Degree>
  | Map<PitchIds, Pitch>
  | Map<PozitionIds, Pozition>
