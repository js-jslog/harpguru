import { getHarpStrata, getCovariantSet } from 'harpstrata'
import type { PitchIds, HarpStrata } from 'harpstrata'

import { getPropsForHarpStrata } from '../../../helpers'
import { DisplayModes } from '../../../HarpFace'

export const setPozitionRootAtCell = (
  activeHarpStrata: HarpStrata,
  newRootPitchId: PitchIds
): HarpStrata => {
  const { harpKeyId: activeHarpKeyId } = activeHarpStrata
  const activeHarpStrataProps = getPropsForHarpStrata(
    activeHarpStrata,
    DisplayModes.Degree
  )

  const covariantControllers = {
    harpKeyId: activeHarpKeyId,
    rootPitchId: newRootPitchId,
  }
  const { pozitionId: newPozitionId } = getCovariantSet(covariantControllers)

  return getHarpStrata({
    ...activeHarpStrataProps,
    harpKeyId: activeHarpKeyId,
    pozitionId: newPozitionId,
  })
}
