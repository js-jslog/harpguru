import type { HarpStrata, HarpStrataProps } from 'harpstrata'

import {DisplayModes} from '../../../HarpFace'


export const getPropsForHarpStrata = (harpStrata: HarpStrata, displayMode: DisplayModes): HarpStrataProps => {
  const { apparatus: { id: apparatusId }} = harpStrata
  const { pozitionId } = harpStrata
  const { harpKeyId } = harpStrata
  const { isActiveComplex: { activePitchIds, activeDegreeIds }} = harpStrata

  if (displayMode === DisplayModes.Degree) {
    return { apparatusId, pozitionId, harpKeyId, activeIds: activeDegreeIds }
  }

  return { apparatusId, pozitionId, harpKeyId, activeIds: activePitchIds }
}
