import type { Hole } from '../../types'
import {
  isConsecutiveWithPrevious,
  Direction,
} from '../../../packages/is-consecutive-with-previous'

export enum HoleErrors {
  ConflictingDrawBends = 'CONFLICTING_DRAW_BENDS',
  ConflictingBlowBends = 'CONFLICTING_BLOW_BENDS',
  TooManyBends = 'TOO_MANY_BENDS',
  TooManyBlowbends = 'TOO_MANY_BLOWBENDS',
  TooManyOverblows = 'TOO_MANY_OVERBLOWS',
  TooManyOverdraws = 'TOO_MANY_OVERDRAWS',
  NonconsecutiveBends = 'NONCONSECUTIVE_BENDS',
  NonconsecutiveBlowbends = 'NONCONSECUTIVE_BLOWBENDS',
  NonconsecutiveOverblows = 'NONCONSECUTIVE_OVERBLOWS',
  NonconsecutiveOverdraws = 'NONCONSECUTIVE_OVERDRAWS',
}

export const isHoleValid = (hole: Hole): HoleErrors[] => {
  const bendLimit = 5
  const overbendLimit = 2
  const { Ascending } = Direction

  const conflictingDrawBends =
    hole.bends.length > 0 && hole.overdraws.length > 0
      ? [HoleErrors.ConflictingDrawBends]
      : []
  const conflictingBlowBends =
    hole.blowbends.length > 0 && hole.overblows.length > 0
      ? [HoleErrors.ConflictingBlowBends]
      : []
  const tooManyBends =
    hole.bends.length > bendLimit ? [HoleErrors.TooManyBends] : []
  const tooManyBlowbends =
    hole.blowbends.length > bendLimit ? [HoleErrors.TooManyBlowbends] : []
  const tooManyOverblows =
    hole.overblows.length > overbendLimit ? [HoleErrors.TooManyOverblows] : []
  const tooManyOverdraws =
    hole.overdraws.length > overbendLimit ? [HoleErrors.TooManyOverdraws] : []
  const nonconsecutiveBends = !hole.bends.every(
    isConsecutiveWithPrevious.bind(undefined, Ascending)
  )
    ? [HoleErrors.NonconsecutiveBends]
    : []
  const nonconsecutiveBlowbends = !hole.blowbends.every(
    isConsecutiveWithPrevious.bind(undefined, Ascending)
  )
    ? [HoleErrors.NonconsecutiveBlowbends]
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
    ...conflictingDrawBends,
    ...conflictingBlowBends,
    ...tooManyBends,
    ...tooManyBlowbends,
    ...tooManyOverblows,
    ...tooManyOverdraws,
    ...nonconsecutiveBends,
    ...nonconsecutiveBlowbends,
    ...nonconsecutiveOverblows,
    ...nonconsecutiveOverdraws,
  ]
}
