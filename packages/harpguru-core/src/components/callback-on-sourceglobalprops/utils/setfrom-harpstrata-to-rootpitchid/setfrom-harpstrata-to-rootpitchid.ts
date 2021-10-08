import type { HarpStrata } from 'harpstrata'
import type { PitchIds } from 'harpparts'

export const setFromHarpStrataToRootPitchId = (
  harpStrata: HarpStrata,
  prevRootPitchId: PitchIds,
  setRootPitchId: (arg0: PitchIds) => void
): PitchIds => {
  const { rootPitchId: nextRootPitchId } = harpStrata
  if (prevRootPitchId !== nextRootPitchId) setRootPitchId(nextRootPitchId)
  return nextRootPitchId
}
