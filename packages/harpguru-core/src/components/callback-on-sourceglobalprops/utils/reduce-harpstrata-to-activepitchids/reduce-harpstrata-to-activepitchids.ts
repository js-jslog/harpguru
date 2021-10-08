import type { HarpStrata } from 'harpstrata'
import type { PitchIds } from 'harpparts'

export const reduceHarpStrataToActivePitchIds = (
  nextHarpStrata: HarpStrata
): ReadonlyArray<PitchIds> => {
  const { activePitchIds } = nextHarpStrata
  return activePitchIds
}
