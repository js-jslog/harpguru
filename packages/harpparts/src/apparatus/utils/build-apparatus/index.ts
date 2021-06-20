import { reedArrayToMatrices } from '../reed-array-to-matrices'
import type { Apparatus } from '../../types'
import type { TuningIds } from '../../../tuning'
import { getTuning } from '../../../access-parts'

export const buildApparatus = (tuningId: TuningIds): Apparatus => {
  const tuning = getTuning(tuningId)
  return {
    tuningId: tuning.id,
    ...reedArrayToMatrices(tuning.reedArray, tuning.id),
  }
}
