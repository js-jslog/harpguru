import { getActivePozitionIds, getPozition } from './Pozition'
import { getDegreeMatrix } from './Degree'
import { getActiveApparatusIds, getApparatus } from './Apparatus'

import type { HarpStrata, PozitionIds, ApparatusIds } from './types'


export const getApparatusIds = getActiveApparatusIds

export const getPozitionIds = getActivePozitionIds

export const getHarpStrata = (apparatusId: ApparatusIds, pozitionId: PozitionIds): HarpStrata => {
  const apparatus = getApparatus(apparatusId)
  const pozition = getPozition(pozitionId)
  const degreeMatrix = getDegreeMatrix(apparatus.halfstepIndexMatrix, pozition.root)

  return {
    apparatus,
    degreeMatrix,
  }
}

export {
  HarpStrata,
  ApparatusIds,
  Apparatus,
  InteractionIds,
  Interaction,
  InteractionMask,
  HalfstepIndex,
  HalfstepIndexRow,
  HalfstepIndexMatrix,
  DegreeIds,
  Degree,
  DegreeRow,
  DegreeMatrix,
  PozitionIds,
  Pozition
} from './types'
