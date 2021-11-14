import { reedArrayToMatrices } from '../reed-array-to-matrices'
import type { Apparatus } from '../../types'
import { ValvingIds } from '../../../valving'
import { isReedArrayEmpty, TuningIds } from '../../../tuning'
import { getTuning } from '../../../access-parts'

export const buildApparatus = (
  tuningId: TuningIds,
  valvingId: ValvingIds
): Apparatus => {
  const { reedArrays } = getTuning(tuningId)
  const [reedArray1, reedArray2] = reedArrays
  // TODO: the conditional on the possibility of reedArray2 being empty
  // is a massive (but temporary) cop out. There's some typing complexity
  // to deal with around here, but while I'm just refounding this whole
  // thing for double reed arrays I need to let a few things go.
  const halfstepIndexMatrix = {
    harpface1: reedArrayToMatrices(reedArray1, tuningId, valvingId)
      .halfstepIndexMatrix,
    harpface2: isReedArrayEmpty(reedArray2)
      ? undefined
      : reedArrayToMatrices(reedArray2, tuningId, valvingId)
        .halfstepIndexMatrix,
  }
  const interactionMatrix = {
    harpface1: reedArrayToMatrices(reedArray1, tuningId, valvingId)
      .interactionMatrix,
    harpface2: isReedArrayEmpty(reedArray2)
      ? undefined
      : reedArrayToMatrices(reedArray2, tuningId, valvingId).interactionMatrix,
  }
  return {
    tuningId,
    valvingId,
    halfstepIndexMatrix,
    interactionMatrix,
  }
}
