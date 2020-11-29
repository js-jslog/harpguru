import type { HarpStrata, HarpStrataProps } from '../get-harp-strata'

export const getPropsForHarpStrata = (
  harpStrata: HarpStrata,
  mode: 'DEGREE' | 'PITCH'
): HarpStrataProps => {
  const {
    apparatus: { id: apparatusId },
  } = harpStrata
  const { pozitionId } = harpStrata
  const { harpKeyId } = harpStrata
  const { activePitchIds, activeDegreeIds } = harpStrata

  if (mode === 'DEGREE') {
    return { apparatusId, pozitionId, harpKeyId, activeIds: activeDegreeIds }
  }

  return { apparatusId, pozitionId, harpKeyId, activeIds: activePitchIds }
}
