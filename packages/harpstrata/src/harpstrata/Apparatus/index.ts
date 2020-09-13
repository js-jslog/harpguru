import type { ApparatusIds, Apparatus } from './types'
import {
  MAJOR_DIATONIC_APPARATUS,
  COUNTRY_TUNED_APPARATUS,
  NATURAL_MINOR_APPARATUS,
  WILDE_TUNED_APPARATUS,
  POWER_BENDER_APPARATUS,
} from './constants'

const apparatusMap = new Map()
apparatusMap.set(MAJOR_DIATONIC_APPARATUS.id, MAJOR_DIATONIC_APPARATUS)
apparatusMap.set(COUNTRY_TUNED_APPARATUS.id, COUNTRY_TUNED_APPARATUS)
apparatusMap.set(NATURAL_MINOR_APPARATUS.id, NATURAL_MINOR_APPARATUS)
apparatusMap.set(WILDE_TUNED_APPARATUS.id, WILDE_TUNED_APPARATUS)
apparatusMap.set(POWER_BENDER_APPARATUS.id, POWER_BENDER_APPARATUS)

export const getActiveApparatusIds = (): ApparatusIds[] =>
  Array.from(apparatusMap.keys())
export const getApparatus = (apparatusId: ApparatusIds): Apparatus =>
  apparatusMap.get(apparatusId)

export { ApparatusIds } from './types'
export { InteractionIds } from './Interaction'

export type { Apparatus } from './types'
export type {
  Interaction,
  InteractionMatrix,
  InteractionRow,
} from './Interaction'
export type {
  HalfstepIndex,
  HalfstepIndexMatrix,
  HalfstepIndexRow,
} from './HalfstepIndex'
export {
  MAJOR_DIATONIC_APPARATUS,
  COUNTRY_TUNED_APPARATUS,
  NATURAL_MINOR_APPARATUS,
} from './constants'
