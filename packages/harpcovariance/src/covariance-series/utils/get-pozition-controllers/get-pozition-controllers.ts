import type { PozitionCovariancePrimer } from '../../covariance-series-types'
import { CovariantMembers } from '../../covariance-series-types'
import type { PozitionControllers } from '../../../covariant-set'

export const getPozitionControllers = (
  props: PozitionCovariancePrimer
): PozitionControllers => {
  const { lockedType, lockedValue, variedValue } = props

  if (lockedType === CovariantMembers.RootPitch) {
    const harpKeyId = variedValue
    const rootPitchId = lockedValue
    const pozitionControllers: PozitionControllers = { harpKeyId, rootPitchId }
    return pozitionControllers
  } else {
    const harpKeyId = lockedValue
    const rootPitchId = variedValue
    const pozitionControllers: PozitionControllers = { harpKeyId, rootPitchId }
    return pozitionControllers
  }
}
