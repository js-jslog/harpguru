import { PozitionIds } from './Pozition/types'
import { getActivePozitionIds, getPozition } from './Pozition'
import { getDegreeMatrix } from './Degree'
import { ApparatusIds } from './Apparatus/types'
import { getActiveApparatusIds, getApparatus } from './Apparatus'

import { HarpStrata } from './types'


export const getHarpIds = getActiveApparatusIds

export const getPozitions = getActivePozitionIds

export const getHarpStrata = (apparatusId: ApparatusIds, pozitionId: PozitionIds): HarpStrata => {
  const apparatus = getApparatus(apparatusId)
  const pozition = getPozition(pozitionId)
  const degreeMatrix = getDegreeMatrix(apparatus.halfstepIndexMatrix, pozition.root)

  return {
    apparatus,
    degreeMatrix,
  }
}
