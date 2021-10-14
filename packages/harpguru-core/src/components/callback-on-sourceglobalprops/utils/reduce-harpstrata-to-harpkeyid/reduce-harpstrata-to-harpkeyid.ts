import type { HarpStrata } from 'harpstrata'
import type { PitchIds } from 'harpparts'

export const reduceHarpStrataToHarpKeyId = (
  prevHarpKeyId: PitchIds,
  harpStrata: HarpStrata
): PitchIds => {
  const { harpKeyId: nextHarpKeyId } = harpStrata
  if (prevHarpKeyId === nextHarpKeyId) return prevHarpKeyId
  return nextHarpKeyId
}
