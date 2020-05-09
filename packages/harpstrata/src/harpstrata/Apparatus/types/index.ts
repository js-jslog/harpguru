import { InteractionMatrix } from '../Interaction'
import { HalfstepIndexMatrix } from '../HalfstepIndex'

export enum ApparatusIds {
  MajorDiatonic = 'MAJOR-DIATONIC',
  CountryTuned = 'COUNTRY-TUNED',
  NaturalMinor = 'NATURAL-MINOR',
}

export type Apparatus = {
  readonly id: ApparatusIds;
  readonly halfstepIndexMatrix: HalfstepIndexMatrix;
  readonly interactionMatrix: InteractionMatrix;
}
