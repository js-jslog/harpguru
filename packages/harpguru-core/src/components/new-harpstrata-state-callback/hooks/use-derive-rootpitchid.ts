import type { HarpStrata } from 'harpstrata'
import type { PitchIds } from 'harpparts'

export const useDeriveRootPitchId = (
  newHarpStrata: HarpStrata,
  prevRootPitchId: PitchIds,
  setRootPitchId: (arg0: PitchIds) => void
): PitchIds => {
  const { rootPitchId: nextRootPitchId } = newHarpStrata
  if (prevRootPitchId !== nextRootPitchId) setRootPitchId(nextRootPitchId)
  return nextRootPitchId
}
