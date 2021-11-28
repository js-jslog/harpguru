import {
  buildApparatus,
  getPitch,
  getPozition,
  mapHarpFaceFacts,
} from 'harpparts'
import type { HalfstepIndex, HarpFaceMatrix } from 'harpparts'
import { getCovariantSet } from 'harpcovariance'

import type { HarpStrataProps, HarpStrata } from '../types'

import { getDegreeMatrix, getPitchMatrix, getActiveIdsPair } from './utils'

export const getHarpStrata = (props: HarpStrataProps): HarpStrata => {
  const { tuningId, valvingId, pozitionId, harpKeyId, activeIds } = props

  const apparatus = buildApparatus(tuningId, valvingId)

  const { rootOffset } = getPozition(pozitionId)
  const pitch = getPitch(harpKeyId)
  const { id: pitchId } = pitch

  const { halfstepIndexMatrix: halfstepIndexMatrices } = apparatus
  const mapToDegreeMatrix = (
    halfstepIndexMatrix: HarpFaceMatrix<HalfstepIndex>
  ) => getDegreeMatrix(halfstepIndexMatrix, rootOffset)
  const degreeMatrices = mapHarpFaceFacts(
    halfstepIndexMatrices,
    mapToDegreeMatrix
  )

  const mapToPitchMatrix = (
    halfstepIndexMatrix: HarpFaceMatrix<HalfstepIndex>
  ) => getPitchMatrix(halfstepIndexMatrix, pitchId)
  const pitchMatrices = mapHarpFaceFacts(
    halfstepIndexMatrices,
    mapToPitchMatrix
  )

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
