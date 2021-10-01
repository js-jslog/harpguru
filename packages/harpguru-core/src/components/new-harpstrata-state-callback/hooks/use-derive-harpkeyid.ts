import type { HarpStrata } from 'harpstrata'
import type { PitchIds } from 'harpparts'

export const useDeriveHarpKeyId = (
  newHarpStrata: HarpStrata,
  prevHarpKeyId: PitchIds,
  setHarpKeyId: (arg0: PitchIds) => void
): PitchIds => {
  const { harpKeyId: nextHarpKeyId } = newHarpStrata
  if (prevHarpKeyId !== nextHarpKeyId) setHarpKeyId(nextHarpKeyId)
  return nextHarpKeyId
}
