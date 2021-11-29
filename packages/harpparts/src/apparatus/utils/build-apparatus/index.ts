import { reedArrayToMatrices } from '../reed-array-to-matrices'
import type { Apparatus } from '../../types'
import { ValvingIds } from '../../../valving'
import { mapHarpFaceFacts } from '../../../utils'
import { TuningIds } from '../../../tuning'
import type { ReedArray } from '../../../tuning'
import { getTuning } from '../../../access-parts'

export const buildApparatus = (
  tuningId: TuningIds,
  valvingId: ValvingIds
): Apparatus => {
  const { reedArrays } = getTuning(tuningId)

  const reedArrayToHalfstepIndexMatrix = (reedArray: ReedArray) =>
    reedArrayToMatrices(reedArray, tuningId, valvingId).halfstepIndexMatrix
  const halfstepIndexMatrix = mapHarpFaceFacts(
    reedArrays,
    reedArrayToHalfstepIndexMatrix
  )

  const reedArrayToInteractionMatrix = (reedArray: ReedArray) =>
    reedArrayToMatrices(reedArray, tuningId, valvingId).interactionMatrix
  const interactionMatrix = mapHarpFaceFacts(
    reedArrays,
    reedArrayToInteractionMatrix
  )
  return {
    tuningId,
    valvingId,
    halfstepIndexMatrix,
    interactionMatrix,
  }
}
