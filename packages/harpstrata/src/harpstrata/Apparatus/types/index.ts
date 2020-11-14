import { InteractionMatrix } from '../Interaction'
import { HalfstepIndexMatrix } from '../HalfstepIndex'

export enum ApparatusIds {
  MajorDiatonic = 'Major diatonic',
  CountryTuned = 'Country tuned',
  NaturalMinor = 'Natural minor',
  WildeTuned = 'Wilde tuned',
  PowerBender = 'Power bender',
}

export type Apparatus = {
  readonly id: ApparatusIds
  readonly halfstepIndexMatrix: HalfstepIndexMatrix
  readonly interactionMatrix: InteractionMatrix
}
