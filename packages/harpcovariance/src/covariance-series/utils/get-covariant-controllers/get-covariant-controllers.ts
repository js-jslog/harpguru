import { getRootPitchControllers } from '../get-root-pitch-controllers'
import { getPozitionControllers } from '../get-pozition-controllers'
import { getHarpKeyControllers } from '../get-harp-key-controllers'
import type { CovariancePrimer } from '../../covariance-series-types'
import {
  isRootPitchCovariancePrimer,
  isHarpKeyCovariancePrimer,
  isPozitionCovariancePrimer,
} from '../../covariance-series-typeguards'
import type { CovariantControllers } from '../../../covariant-set'

export const getCovariantControllers = (
  props: CovariancePrimer
): CovariantControllers => {
  if (isHarpKeyCovariancePrimer(props)) {
    const covariantControllers = getHarpKeyControllers(props)
    return covariantControllers
  } else if (isPozitionCovariancePrimer(props)) {
    const covariantControllers = getPozitionControllers(props)
    return covariantControllers
  } else if (isRootPitchCovariancePrimer(props)) {
    const covariantControllers = getRootPitchControllers(props)
    return covariantControllers
  }

  const errorMessage = `
    Input args did not meet CovariancePrimer expectations.

    Input: ${JSON.stringify(props)}

    Two of the CovariantMembers properties need to be defined as lockedType and variedType.
  `
  throw new Error(errorMessage)
}
