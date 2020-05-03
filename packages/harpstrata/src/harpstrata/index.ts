import { getActivePozitionIds, getPozition } from './Pozition'
import { getPitchMatrix, getActivePitchIds, getPitch } from './Pitch'
import { getDegreeMatrix } from './Degree'
import { getActiveApparatusIds, getApparatus } from './Apparatus'

import type { HarpStrata, PozitionIds, ApparatusIds, PitchIds } from './types'


export const getApparatusIds = getActiveApparatusIds

export const getPozitionIds = getActivePozitionIds

export const getPitchIds = getActivePitchIds

export const getHarpStrata = (apparatusId: ApparatusIds, pozitionId: PozitionIds, keyPitchId: PitchIds): HarpStrata => {
  const apparatus = getApparatus(apparatusId)
  const pozition = getPozition(pozitionId)
  const pitch = getPitch(keyPitchId)
  const degreeMatrix = getDegreeMatrix(apparatus.halfstepIndexMatrix, pozition.root)
  const pitchMatrix = getPitchMatrix(apparatus.halfstepIndexMatrix, pitch.id)

  return {
    apparatus,
    degreeMatrix,
    pitchMatrix,
  }
}

export {
  HarpStrata,
  ApparatusIds,
  Apparatus,
  InteractionIds,
  Interaction,
  InteractionRow,
  InteractionMatrix,
  HalfstepIndex,
  HalfstepIndexRow,
  HalfstepIndexMatrix,
  DegreeIds,
  Degree,
  DegreeRow,
  DegreeMatrix,
  PozitionIds,
  Pozition,
  PitchIds,
  Pitch
} from './types'
