import type { HarpStrata } from 'harpstrata'
import type { TuningIds } from 'harpparts'

export const useDeriveTuningId = (
  newHarpStrata: HarpStrata,
  prevTuningId: TuningIds,
  setTuningId: (arg0: TuningIds) => void
): TuningIds => {
  const {
    apparatus: { tuningId: nextTuningId },
  } = newHarpStrata
  if (prevTuningId !== nextTuningId) setTuningId(nextTuningId)
  return nextTuningId
}
