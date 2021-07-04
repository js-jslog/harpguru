import { orderedTunings } from '../constants'
import type { TuningIds, Tuning } from '../../tuning'

export const getTuning = (tuningId: TuningIds): Tuning => {
  const tuning = orderedTunings.get(tuningId)
  if (tuning === undefined) throw 'A tuning id for an unlisted tuning was used'
  return tuning
}
