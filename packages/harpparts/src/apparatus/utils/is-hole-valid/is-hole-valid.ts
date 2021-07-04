import type { Hole } from '../../types'
import {
  isConsecutiveWithPrevious,
  Direction,
} from '../../../packages/is-consecutive-with-previous'

export enum HoleErrors {
  ConflictingBlowbends = 'CONFLICTING_BLOWBENDS',
  ConflictingDrawbends = 'CONFLICTING_DRAWBENDS',
  ConflictingValvedblows = 'CONFLICTING_VALVED_BLOWS',
  ConflictingValveddraws = 'CONFLICTING_VALVED_DRAWS',
  TooManyBlowbends = 'TOO_MANY_BLOWBENDS',
  TooManyDrawbends = 'TOO_MANY_DRAWBENDS',
  TooManyOverblows = 'TOO_MANY_OVERBLOWS',
  TooManyOverdraws = 'TOO_MANY_OVERDRAWS',
  TooManyValvedblows = 'TOO_MANY_VALVEDBLOWS',
  TooManyValveddraws = 'TOO_MANY_VALVEDDRAWS',
  NonconsecutiveDrawbends = 'NONCONSECUTIVE_DRAWBENDS',
  NonconsecutiveBlowbends = 'NONCONSECUTIVE_BLOWBENDS',
  NonconsecutiveOverblows = 'NONCONSECUTIVE_OVERBLOWS',
  NonconsecutiveOverdraws = 'NONCONSECUTIVE_OVERDRAWS',
}

export const isHoleValid = (hole: Hole): HoleErrors[] => {
  // These limits are defined based on the experiments of
  // Woozle Effect and define either the point at which bends
  // can no longer be reached or are a proxy definition for
  // when reeds are set so far apart that sympathetic bends
  // can't even be started. Either way, the hole which is
  // the subject to these checks *is* invalid as it represnets
  // unachievable interactions.
  const bendLimit = 5
  const overbendLimit = 2
  const valvedbendLimit = 2
  const { Ascending } = Direction

  const conflictingBlowbends =
    hole.blowbends.length > 0 && hole.overblows.length > 0
      ? [HoleErrors.ConflictingBlowbends]
      : []
  const conflictingDrawbends =
    hole.drawbends.length > 0 && hole.overdraws.length > 0
      ? [HoleErrors.ConflictingDrawbends]
      : []
  const conflictingValvedblowbends =
    hole.valvedblows.length > 0 &&
    (hole.blowbends.length > 0 || hole.overblows.length > 0)
      ? [HoleErrors.ConflictingValvedblows]
      : []
  const conflictingValveddrawbends =
    hole.valveddraws.length > 0 &&
    (hole.drawbends.length > 0 || hole.overdraws.length > 0)
      ? [HoleErrors.ConflictingValveddraws]
      : []
  const tooManyBlowbends =
    hole.blowbends.length > bendLimit ? [HoleErrors.TooManyBlowbends] : []
  const tooManyDrawbends =
    hole.drawbends.length > bendLimit ? [HoleErrors.TooManyDrawbends] : []
  const tooManyOverblows =
    hole.overblows.length > overbendLimit ? [HoleErrors.TooManyOverblows] : []
  const tooManyOverdraws =
    hole.overdraws.length > overbendLimit ? [HoleErrors.TooManyOverdraws] : []
  const tooManyValvedblows =
    hole.valvedblows.length > valvedbendLimit
      ? [HoleErrors.TooManyValvedblows]
      : []
  const tooManyValveddraws =
    hole.valveddraws.length > valvedbendLimit
      ? [HoleErrors.TooManyValveddraws]
      : []
  const nonconsecutiveBlowbends = !hole.blowbends.every(
    isConsecutiveWithPrevious.bind(undefined, Ascending)
  )
    ? [HoleErrors.NonconsecutiveBlowbends]
    : []
  const nonconsecutiveDrawbends = !hole.drawbends.every(
    isConsecutiveWithPrevious.bind(undefined, Ascending)
  )
    ? [HoleErrors.NonconsecutiveDrawbends]
    : []
  const nonconsecutiveOverblows = !hole.overblows.every(
    isConsecutiveWithPrevious.bind(undefined, Ascending)
  )
    ? [HoleErrors.NonconsecutiveOverblows]
    : []
  const nonconsecutiveOverdraws = !hole.overdraws.every(
    isConsecutiveWithPrevious.bind(undefined, Ascending)
  )
    ? [HoleErrors.NonconsecutiveOverdraws]
    : []

  return [
    ...conflictingBlowbends,
    ...conflictingDrawbends,
    ...conflictingValvedblowbends,
    ...conflictingValveddrawbends,
    ...tooManyBlowbends,
    ...tooManyDrawbends,
    ...tooManyOverblows,
    ...tooManyOverdraws,
    ...tooManyValvedblows,
    ...tooManyValveddraws,
    ...nonconsecutiveBlowbends,
    ...nonconsecutiveDrawbends,
    ...nonconsecutiveOverblows,
    ...nonconsecutiveOverdraws,
  ]
}
