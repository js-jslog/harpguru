import type { ApparatusIds, Apparatus } from './types'
import {
  MAJOR_DIATONIC_APPARATUS,
  COUNTRY_TUNED_APPARATUS,
  NATURAL_MINOR_APPARATUS,
} from './constants'


const apparatusMap = new Map()
apparatusMap.set(MAJOR_DIATONIC_APPARATUS.id, MAJOR_DIATONIC_APPARATUS)
apparatusMap.set(COUNTRY_TUNED_APPARATUS.id, COUNTRY_TUNED_APPARATUS)
apparatusMap.set(NATURAL_MINOR_APPARATUS.id, NATURAL_MINOR_APPARATUS)

export const getActiveApparatusIds = (): ApparatusIds[] => Array.from(apparatusMap.keys())
export const getApparatus = (apparatusId: ApparatusIds): Apparatus => apparatusMap.get(apparatusId)
