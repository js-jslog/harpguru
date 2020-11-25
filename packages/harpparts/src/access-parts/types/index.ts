import { PozitionIds } from '../../pozition'
import { PitchIds } from '../../pitch'
import { DegreeIds } from '../../degree'
import { ApparatusIds } from '../../apparatus'

export enum OrderableParts {
  Apparatus,
  Degrees,
  Pitches,
  Pozitions,
}

export type OrderablePartId = ApparatusIds | DegreeIds | PitchIds | PozitionIds
