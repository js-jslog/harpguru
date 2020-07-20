import {
  getAscendingPozitionIds,
  getAscendingPitchIds,
  getAscendingDegreeIds
} from '../OrderedIds'
import { getActiveApparatusIds } from '../Apparatus'


export const getApparatusIds = getActiveApparatusIds

export const getPozitionIds = getAscendingPozitionIds

export const getPitchIds = getAscendingPitchIds

export const getDegreeIds = getAscendingDegreeIds

export { getHarpStrata } from './getHarpStrata'

export type { HarpStrataProps, HarpStrata } from './types'

export { EXAMPLE_STRATA } from './testResources'
