import type { HarpStrata } from 'harpstrata'
import type { PitchIds } from 'harpparts'

export const setFromHarpStrataToHarpKeyId = (
  harpStrata: HarpStrata,
  prevHarpKeyId: PitchIds,
  setHarpKeyId: (arg0: PitchIds) => void
): PitchIds => {
  const { harpKeyId: nextHarpKeyId } = harpStrata
  if (prevHarpKeyId !== nextHarpKeyId) setHarpKeyId(nextHarpKeyId)
  return nextHarpKeyId
}
