import type { RootPitchControllers, PitchIds, PozitionIds } from 'harpstrata'

import type { RootPitchCovariancePrimer } from '../types'
import { CovariantMembers } from '../types'

export const getRootPitchControllers = (props: RootPitchCovariancePrimer): RootPitchControllers => {
  const { lockedType, lockedValue, variedValue } = props

  if ( lockedType === CovariantMembers.Pozition ) {
    const harpKeyId = variedValue as PitchIds
    const pozitionId = lockedValue as PozitionIds
    const rootPitchControllers: RootPitchControllers = { harpKeyId, pozitionId }
    return rootPitchControllers
  } else {
    const harpKeyId = lockedValue as PitchIds
    const pozitionId = variedValue as PozitionIds
    const rootPitchControllers: RootPitchControllers = { harpKeyId, pozitionId }
    return rootPitchControllers
  }
}
