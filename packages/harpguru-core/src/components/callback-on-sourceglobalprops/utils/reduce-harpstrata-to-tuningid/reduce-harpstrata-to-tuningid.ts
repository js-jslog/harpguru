import type { HarpStrata } from 'harpstrata'
import type { TuningIds } from 'harpparts'

export const reduceHarpStrataToTuningId = (
  prevTuningId: TuningIds,
  harpStrata: HarpStrata
): TuningIds => {
  const {
    apparatus: { tuningId: nextTuningId },
  } = harpStrata
  if (prevTuningId === nextTuningId) return prevTuningId
  return nextTuningId
}
