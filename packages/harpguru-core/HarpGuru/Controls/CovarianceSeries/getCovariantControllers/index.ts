import type { CovariantControllers } from 'harpstrata'

import type { CovariancePrimer } from '../types'
import {
  isRootPitchCovariancePrimer,
  isHarpKeyCovariancePrimer,
  isPozitionCovariancePrimer,
} from '../typeguards'
import { getRootPitchControllers } from '../getRootPitchControllers'
import { getPozitionControllers } from '../getPozitionControllers'
import { getHarpKeyControllers } from '../getHarpKeyControllers'

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
