import type { HarpKeyControllers, PitchIds } from 'harpstrata'
import type { PozitionIds } from 'harpparts'

import type { HarpKeyCovariancePrimer } from '../../covariance-series-types'
import { CovariantMembers } from '../../covariance-series-types'

export const getHarpKeyControllers = (
  props: HarpKeyCovariancePrimer
): HarpKeyControllers => {
  const { lockedType, lockedValue, variedValue } = props

  if (lockedType === CovariantMembers.RootPitch) {
    const pozitionId = variedValue as PozitionIds
    const rootPitchId = lockedValue as PitchIds
    const harpKeyControllers: HarpKeyControllers = { pozitionId, rootPitchId }
    return harpKeyControllers
  } else {
    const pozitionId = lockedValue as PozitionIds
    const rootPitchId = variedValue as PitchIds
    const harpKeyControllers: HarpKeyControllers = { pozitionId, rootPitchId }
    return harpKeyControllers
  }
}
