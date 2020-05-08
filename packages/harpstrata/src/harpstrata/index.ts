import { getActivePozitionIds, getPozition } from './Pozition'
import { getPitchMatrix, getActivePitchIds, getPitch } from './Pitch'
import { getIsActiveComplex } from './IsActive'
import { getDegreeMatrix } from './Degree'
import { getActiveApparatusIds, getApparatus } from './Apparatus'

import type { HarpStrataProps, HarpStrata } from './types'


export const getApparatusIds = getActiveApparatusIds

export const getPozitionIds = getActivePozitionIds

export const getPitchIds = getActivePitchIds

export const getHarpStrata = (props: HarpStrataProps): HarpStrata => {
  const { apparatusId, pozitionId, keyPitchId, activeIds } = props

  const apparatus = getApparatus(apparatusId)
  const pozition = getPozition(pozitionId)
  const pitch = getPitch(keyPitchId)

  const { halfstepIndexMatrix } = apparatus
  const { root: pozitionRoot } = pozition
  const { id: pitchId } = pitch

  const degreeMatrix = getDegreeMatrix(halfstepIndexMatrix, pozitionRoot)
  const pitchMatrix = getPitchMatrix(halfstepIndexMatrix, pitchId)
  const isActiveComplex = getIsActiveComplex({degreeMatrix, pitchMatrix, activeIds: activeIds })

  return {
    apparatus,
    degreeMatrix,
    pitchMatrix,
    isActiveComplex,
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

export type { ActiveDegreeIds, ActivePitchIds, ActiveIds, IsActiveMatrix, IsActiveRow, IsActiveComplex } from './IsActive'
export { IsActiveIds } from './IsActive'
