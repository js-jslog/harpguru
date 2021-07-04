import type { ValvingIds, Valving } from '../../valving'
import type { TuningIds, Tuning } from '../../tuning'
import type { ScaleIds, Scale } from '../../scale'
import type { PozitionIds, Pozition } from '../../pozition'
import type { PitchIds, Pitch } from '../../pitch'
import type { DegreeIds, Degree } from '../../degree'

export type OrderablePartId =
  | TuningIds
  | ValvingIds
  | DegreeIds
  | PitchIds
  | PozitionIds
  | ScaleIds

export type OrderablePartList =
  | Map<TuningIds, Tuning>
  | Map<ValvingIds, Valving>
  | Map<DegreeIds, Degree>
  | Map<PitchIds, Pitch>
  | Map<PozitionIds, Pozition>
  | Map<ScaleIds, Scale>
