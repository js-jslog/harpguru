import type { HarpStrata } from 'harpstrata'
import type { TuningIds } from 'harpparts'

export const setFromHarpStrataToTuningId = (
  harpStrata: HarpStrata,
  prevTuningId: TuningIds,
  setTuningId: (arg0: TuningIds) => void
): TuningIds => {
  const {
    apparatus: { tuningId: nextTuningId },
  } = harpStrata
  if (prevTuningId !== nextTuningId) setTuningId(nextTuningId)
  return nextTuningId
}
