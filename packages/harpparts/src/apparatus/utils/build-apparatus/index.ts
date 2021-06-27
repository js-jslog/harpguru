import { reedArrayToMatrices } from '../reed-array-to-matrices'
import type { Apparatus } from '../../types'
import { ValvingIds } from '../../../valving'
import type { TuningIds } from '../../../tuning'
import { getTuning } from '../../../access-parts'

export const buildApparatus = (
  tuningId: TuningIds,
  valvingId: ValvingIds
): Apparatus => {
  const tuning = getTuning(tuningId)
  return {
    tuningId: tuning.id,
    valvingId,
    ...reedArrayToMatrices(
      tuning.reedArray,
      tuning.id,
      valvingId === ValvingIds.HalfValved
    ),
  }
}
