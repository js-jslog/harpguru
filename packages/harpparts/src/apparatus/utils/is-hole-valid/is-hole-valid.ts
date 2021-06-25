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
  ConflictingValvedBlowBends = 'CONFLICTING_VALVED_BLOW_BENDS',
  ConflictingValvedDrawBends = 'CONFLICTING_VALVED_DRAW_BENDS',
}

export const isHoleValid = (hole: Hole): HoleErrors[] => {
  const bendLimit = 5
  const overbendLimit = 2
  const { Ascending } = Direction

  const conflictingBlowBends =
    hole.blowbends.length > 0 && hole.overblows.length > 0
      ? [HoleErrors.ConflictingBlowBends]
      : []
  const conflictingDrawBends =
    hole.drawbends.length > 0 && hole.overdraws.length > 0
      ? [HoleErrors.ConflictingDrawBends]
      : []
  const tooManyBlowbends =
    hole.blowbends.length > bendLimit ? [HoleErrors.TooManyBlowbends] : []
  const tooManyDrawbends =
    hole.drawbends.length > bendLimit ? [HoleErrors.TooManyBends] : []
  const tooManyOverblows =
    hole.overblows.length > overbendLimit ? [HoleErrors.TooManyOverblows] : []
  const tooManyOverdraws =
    hole.overdraws.length > overbendLimit ? [HoleErrors.TooManyOverdraws] : []
  const nonconsecutiveBlowbends = !hole.blowbends.every(
    isConsecutiveWithPrevious.bind(undefined, Ascending)
  )
    ? [HoleErrors.NonconsecutiveBlowbends]
    : []
  const nonconsecutiveDrawbends = !hole.drawbends.every(
    isConsecutiveWithPrevious.bind(undefined, Ascending)
  )
    ? [HoleErrors.NonconsecutiveBends]
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
  const conflictingValvedBlowBends =
    hole.valvedblows.length > 0 &&
    (hole.blowbends.length > 0 || hole.overblows.length > 0)
      ? [HoleErrors.ConflictingValvedBlowBends]
      : []
  const conflictingValvedDrawBends =
    hole.valveddraws.length > 0 &&
    (hole.drawbends.length > 0 || hole.overdraws.length > 0)
      ? [HoleErrors.ConflictingValvedDrawBends]
      : []

  return [
    ...conflictingDrawBends,
    ...conflictingBlowBends,
    ...tooManyDrawbends,
    ...tooManyBlowbends,
    ...tooManyOverblows,
    ...tooManyOverdraws,
    ...nonconsecutiveDrawbends,
    ...nonconsecutiveBlowbends,
    ...nonconsecutiveOverblows,
    ...nonconsecutiveOverdraws,
    ...conflictingValvedBlowBends,
    ...conflictingValvedDrawBends,
  ]
}
