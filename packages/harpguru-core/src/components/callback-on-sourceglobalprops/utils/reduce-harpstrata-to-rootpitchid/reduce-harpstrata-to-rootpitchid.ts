import type { HarpStrata } from 'harpstrata'
import type { PitchIds } from 'harpparts'

export const reduceHarpStrataToRootPitchId = (
  prevRootPitchId: PitchIds,
  harpStrata: HarpStrata
): PitchIds => {
  const { harpKeyId: nextRootPitchId } = harpStrata
  if (prevRootPitchId === nextRootPitchId) return prevRootPitchId
  return nextRootPitchId
}
