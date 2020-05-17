import type { HarpStrataProps, HarpStrata } from '../types'
import { getRootPitch } from '../getRootPitch'
import { getPozition } from '../../Pozition'
import { getPitchMatrix, getPitch } from '../../Pitch'
import { getIsActiveComplex } from '../../IsActive'
import { getDegreeMatrix } from '../../Degree'
import { getApparatus } from '../../Apparatus'

export const getHarpStrata = (props: HarpStrataProps): HarpStrata => {
  const { apparatusId, pozitionId, harpKeyId, activeIds } = props

  const apparatus = getApparatus(apparatusId)
  const pozition = getPozition(pozitionId)
  const pitch = getPitch(harpKeyId)

  const { halfstepIndexMatrix } = apparatus
  const { root: pozitionRoot } = pozition
  const { id: pitchId } = pitch

  const degreeMatrix = getDegreeMatrix(halfstepIndexMatrix, pozitionRoot)
  const pitchMatrix = getPitchMatrix(halfstepIndexMatrix, pitchId)
  const isActiveComplex = getIsActiveComplex({degreeMatrix, pitchMatrix, activeIds: activeIds })

  const rootPitchId = getRootPitch(degreeMatrix, pitchMatrix)

  return {
    apparatus,
    degreeMatrix,
    pitchMatrix,
    isActiveComplex,
    pozitionId,
    rootPitchId,
    harpKeyId,
  }
}
