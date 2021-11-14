import {
  buildApparatus,
  getPitch,
  getPozition,
  isChromaticHarpFace,
} from 'harpparts'
import { getCovariantSet } from 'harpcovariance'

import type { HarpStrataProps, HarpStrata } from '../types'

import { getDegreeMatrix, getPitchMatrix, getActiveIdsPair } from './utils'

export const getHarpStrata = (props: HarpStrataProps): HarpStrata => {
  const { tuningId, valvingId, pozitionId, harpKeyId, activeIds } = props

  const apparatus = buildApparatus(tuningId, valvingId)

  const { rootOffset } = getPozition(pozitionId)
  const pitch = getPitch(harpKeyId)
  const { id: pitchId } = pitch

  const { halfstepIndexMatrix } = apparatus
  const degreeMatrices = {
    harpface1: getDegreeMatrix(halfstepIndexMatrix.harpface1, rootOffset),
    harpface2: isChromaticHarpFace(halfstepIndexMatrix)
      ? getDegreeMatrix(halfstepIndexMatrix.harpface2, rootOffset)
      : undefined,
  }
  const pitchMatrices = {
    harpface1: getPitchMatrix(halfstepIndexMatrix.harpface1, pitchId),
    harpface2: isChromaticHarpFace(halfstepIndexMatrix)
      ? getPitchMatrix(halfstepIndexMatrix.harpface2, pitchId)
      : undefined,
  }

  const { activeDegreeIds, activePitchIds } = getActiveIdsPair({
    degreeMatrix: degreeMatrices.harpface1,
    pitchMatrix: pitchMatrices.harpface1,
    activeIds: activeIds,
  })

  const { rootPitchId } = getCovariantSet({ pozitionId, harpKeyId })

  return {
    apparatus,
    // TODO: It will be necessary to modify the name of these properties eventually
    degreeMatrix: degreeMatrices,
    pitchMatrix: pitchMatrices,
    activeDegreeIds,
    activePitchIds,
    pozitionId,
    rootPitchId,
    harpKeyId,
  }
}
